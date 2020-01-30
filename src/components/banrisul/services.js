const logger = require('../../infra/logger');
const puppeteer = require('puppeteer');
require('../../infra/config')

const url = process.env.URL;

const clickOption = { delay: 400 };

const login = async (page, branch, account, password) => {	
	try {
		logger.info(`Starting loggin process on ${url}`)
		await page.goto(url)
		logger.info('Homepage has been reached');

		logger.info('Clicking on Allow Cookie button');
		await page.click('button#btOk');

		await page.type('#agencia', branch);
		await page.type('#conta', account);
		await page.waitFor(500);
		await page.click('#btnLoginSubmit');

		logger.info('Starting password input process.');
		await page.waitFor('div.modulo-login');	
		const passwordKeys = await mapPasswordKeys(page);
		await page.waitFor(500)
		for (const digit of password) {
			await passwordKeys[digit].click(clickOption)
		}

		logger.info('Accessing account');
		await page.waitFor(500);
		page.click('a#acessar', clickOption)
		await page.waitFor('#sectionHomePessoaFisica');
		logger.info('Logged');
	} catch (error) {
		logger.error(`Error on login. Error: ${error.message}`);
	}
	
};

const mapPasswordKeys = async (page) => {
	const keys = await page.$$('.teclas .tecla')
	const keyMapped = {}

	for (const key of keys) {
		const text = await page.evaluate(element => element.textContent, key)
		if (text.includes('ou')) {
			const digits = text.split('ou').map(digit => digit.trim())
			keyMapped[digits[0]] = key
			keyMapped[digits[1]] = key
		}
	}

	return keyMapped
};

const getBalance = async (page) => {
	try {
		if(await page.$('div#botao-fechar'))
			await page.click('div#botao-fechar');
		await page.waitFor(500);
		await page.click('#accordionExibirBoxContaCorrente');
		await page.click('#accordionExibirBoxContaCorrente');
		await page.waitFor(500);
		await page.screenshot({ path: 'curretScreen.png' });
		// const element = await page.$("#ultimosLancamentos > table > tbody > tr:nth-child(1) > td.txt-right > strong").text();
		const element = await page.$eval('#ultimosLancamentos > table > tbody > tr:nth-child(1) > td.txt-right > strong', 
		el => el.innerText);
		logger.info(`balance ${element}`);
		this.balance = element;
	} catch (error) {
		logger.error(`Error on get current balance. Error: ${error.message}`);
	}
	
};

const diff = async (str, str2) => {
	if(isNaN(str))
		str = str.replace(/\D/g, '')
	if(isNaN(str2))
		str2 = str.replace(/\D/g, '');
	return parseFloat(str) - parseFloat(str2);
};

const getOverdraftLimit = async (page) => {
	
	const overdraftTotal = await page.$eval(
		'#exibirBoxContaCorrente > div.grid-row.clearfix >\
		div.grid-col4 > div.saldo.margem-esquerda10.margem-cima40 > p:nth-child(9) > small:nth-child(2)', el => el.innerText
	);
	
	const overdraftAvailable =  await page.$eval(
		'#exibirBoxContaCorrente > div.grid-row.clearfix >\
		div.grid-col4 > div.saldo.margem-esquerda10.margem-cima40 > p:nth-child(13) > small', el => el.innerText
	);

	const overdraftUsed = await diff(overdraftTotal, overdraftAvailable);
	
	this.overdraftInfo = {
		total: overdraftTotal,
		used: overdraftUsed,
		available: overdraftAvailable
	};
};

// const getMainCardInfo = async (page) => {
// 	this.cardInfo = cardInfo;
// };

const scraper = async (branch, account, password) => {
	try {
		logger.info('Lets scrape Itaú')
		const browser = await puppeteer.launch();

		const page = await browser.newPage()
		page.setViewport({ width: 1366, height: 768 })

		await login(page, branch, account, password);

		await getBalance(page);

		logger.info(`Current Balance: ${this.balance}`);

		await getOverdraftLimit(page);

		logger.info(`Current Balance: ${JSON.stringify(this.overdraftInfo)}`);

		// await getMainCardInfo(page);

		await browser.close()

		logger.info('Scrape finished');
	} catch (error) {
		logger.error(`Error on scrapping. Error: ${error.message}`);
	}
}

module.exports = scraper;
	// data: {
	// 	balance: this.balance
	// 	// overdraft: this.overdraftInfo,
	// 	// cardInfo: this.cardInfo
	// }
