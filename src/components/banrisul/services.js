const logger = require('../../infra/logger');
const puppeteer = require('puppeteer');
require('../../infra/config')

const url = process.env.URL;

const login = async (page, branch, account, password) => {
	
	logger.info(`branch ${branch}`);
	logger.info(`account ${account}`);
	logger.info(`password ${password}`);

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
	const passwordKeys = await mapPasswordKeys(page)
	const clickOption = { delay: 400 }
	await page.waitFor(500)
	for (const digit of password) {
		await passwordKeys[digit].click(clickOption)
	}

	logger.info('Acessing account');
	await page.waitFor(500);
	page.click('a#acessar', clickOption)
	await page.waitFor('#sectionHomePessoaFisica');
	logger.info('Logged');
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

// const getBalance = async (page) => {
// 	const element = await page.$("strong.ct-active");
// 	const balance = await (await element.getProperty('textContent')).jsonValue();
// 	logger.info(`balance ${balance}`);
// 	this.balance = balance;
// };

// const getOverdraftLimit = async (page) => {
// 	this.overdraftInfo = overdraftInfo;
// };

// const getMainCardInfo = async (page) => {
// 	this.cardInfo = cardInfo;
// };

const scraper = async (branch, account, password) => {
	logger.info('Lets scrape Itaú')
	const browser = await puppeteer.launch();

	const page = await browser.newPage()
	page.setViewport({ width: 1366, height: 768 })

	await login(page, branch, account, password);

	//await getBalance(page);

	// await getOverdraftLimit(page);

	// await getMainCardInfo(page);

	await browser.close()

	logger.info('Scrape finished');

	return;
}

module.exports = scraper;
	// data: {
	// 	balance: this.balance
	// 	// overdraft: this.overdraftInfo,
	// 	// cardInfo: this.cardInfo
	// }
