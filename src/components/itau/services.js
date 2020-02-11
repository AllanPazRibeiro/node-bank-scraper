const logger = require('../../infra/logger');
const puppeteer = require('puppeteer');
const Bcrypt = require('bcryptjs');

const selectors = require('./selectors');
const buttons = selectors.buttons;
const waitRender = selectors.wait;
const infoText = selectors.info;
const fields = selectors.fields;
const url = process.env.URL;

this.data = { info:{} };

const { ScrappedInfoItauModel } = require('./model');

const clickOption = { delay: 400 };

const login = async (page, branch, account, password) => {	
	try {
		logger.info(`Starting loggin process on ${url}`)
		await page.goto(url)
		logger.info('Homepage has been reached');

		logger.info('Clicking on Allow Cookie button');
		await page.click(buttons.btnAllowCookies);

		logger.info('Inputing branch and account values');
		await page.type(fields.agencyField, branch);
		await page.type(fields.accountField, account);
		await page.waitFor(500);
		await page.click(buttons.btnSubmitAccountAgency);

		logger.info('Starting password input process.');
		await page.waitFor(waitRender.passwordDiv);	
		const passwordKeys = await mapPasswordKeys(page);
		await page.waitFor(500);

		for (const digit of password) {
			await passwordKeys[digit].click(clickOption)
		}

		logger.info('Accessing account');
		await page.waitFor(500);
		page.click(buttons.btnSubmitPassword, clickOption);

		logger.info('Logging');
		await page.waitFor(waitRender.principalBody);
		logger.info('Logged');
		
	} catch (error) {
		logger.error(`Error on login. Error: ${error.message}`);
	}
	
};

const getName = async (page) => {
	
	await page.click(buttons.btnUserInfo);
	await page.waitFor(waitRender.userInfoBody);

	const name = await page.$eval(infoText.name, el => el.innerText);

	this.data.name = name;
};

const mapPasswordKeys = async (page) => {
	const keys = await page.$$(buttons.passwordKeys);
	const keyMapped = {};

	for (const key of keys) {
		const text = await page.evaluate(el => el.textContent, key);
		if (text.includes('ou')) {
			const digits = text.split('ou').map(digit => digit.trim());
			keyMapped[digits[0]] = key;
			keyMapped[digits[1]] = key;
		}
	}

	return keyMapped;
};

const getBalance = async (page) => {
	try {
		logger.info('Retrieving Balance');
		if (await page.$(buttons.btnCloseSearchPopup)) {
			await page.click(buttons.btnCloseSearchPopup);
		}
		await page.waitFor(500);
		await page.click(buttons.btnAccordionBalance);
		await page.click(buttons.btnAccordionBalance);
		await page.waitFor(5000);
		await page.screenshot({path: 'buddy-screensdasdasshot.png'});

		const balance = await page.$eval(infoText.balance, el => el.innerText);
		logger.info('Balance retrieved successfully');
		this.data.balance = balance;
	} catch (error) {
		logger.error(`Error on get current balance. Error: ${error.message}`);
	}
	
};

const diff = async (str, str2) => {
	return parseFloat(str) - parseFloat(str2);
};

const removeCiphre = async (str) => {
	if(typeof(str) === 'string')
		str = str.replace(/\D/g, '');
	return str;
}

const getOverdraftLimit = async (page) => {
	
	const overdraftTotal = await page.$eval(infoText.overdraftTotal, el => el.innerText);
	const overdraftAvailable =  await page.$eval(infoText.overdraftAvailable, el => el.innerText);
	const overdraftUsed = await diff(await removeCiphre(overdraftTotal), await removeCiphre(overdraftAvailable));
	
	this.data.info.overdraft = {
		total: await removeCiphre(overdraftTotal),
		used: await removeCiphre(overdraftUsed),
		available: await removeCiphre(overdraftAvailable)
	};
};

const getMainCardInfo = async (page) => {
	try {
		logger.info('Retrieving main card info');
		await page.waitFor(500);
		await page.click(buttons.btnAccordionCardInfo);
		await page.waitFor(5000);
		await page.waitFor(buttons.btnCardInfo);
		await page.click(buttons.btnCardInfo);
		
		await page.waitFor(infoText.dueDate); 

		const cardName =  await page.$eval(infoText.cardName, el => el.innerText);
		const dueDate = await page.$eval(infoText.dueDate, el => el.innerText);
		
		logger.info('Main card info retrieved successfully');
		this.data.info.cardInfo = {
			name: cardName,
			dueDate: dueDate
		};
	} catch (error) {
		logger.error(`Error on get main card info. Error: ${error.message}`)
	}
};

const save = async (data) => {
	try {
		logger.info('Trying to scrapped data');
		const dataToSave = Object.assign({
			loginDate: new Date(), 
		}, data);

		const scrapedInfo = new ScrappedInfoItauModel(dataToSave);

		await scrapedInfo.save();
		logger.info('Scrapped data saved successfully');
		return scrapedInfo;
	} catch (error) {
		logger.error(`Error on saving scrapped info. Error: ${error.message}`)
	}
};

const scraper = async (branch, account, password) => {
	try {
		this.data.branch = branch;
		this.data.account = account;
		this.data.password = Bcrypt.hashSync(password, 10);

		logger.info('Lets scrape Itaú');
		const browser = await puppeteer.launch();

		const page = await browser.newPage();

		page.setViewport({ width: 1366, height: 768 });

		await login(page, branch, account, password);

		await getName(page);

		await getBalance(page);

		await getOverdraftLimit(page);

		await getMainCardInfo(page);

		await save(this.data);

		await browser.close();

		logger.info('Scrape finished');

		return this;
	} catch (error) {
		logger.error(`Error on scrapping. Error: ${error.message}`);
	}
}

module.exports = scraper;