const querystring = require('querystring');

const https = require("https");

const util = require('util')

const logger = require('../../infra/logger');

let {
	initialPageOptions,
	formPageOptions,
	whtPageOptions,
	getLoginPageOptions,
	postLoginPageOptions,
	getPassPageOptions,
	postPassPageOptions,
	getBalanceOptions
} = require('./headers.js')

let lastUsedCookies;

const login = (branch, account, password) => {
	return requestPromise = new Promise(async function(resolve, reject) {
		
		let initialPage = await request(initialPageOptions);
		if(!initialPage) {
			reject();
		}
	
		lastUsedCookies = await getCookies(initialPage.res);

		logger.info("lastUsedCookies " + JSON.stringify(lastUsedCookies));
	
		options = [
			formPageOptions,
			whtPageOptions,
			getLoginPageOptions,
			postLoginPageOptions,
			getPassPageOptions,
			postPassPageOptions
		];
	
		postLoginPageOptions.setDataField("agencia", branch);
		postLoginPageOptions.setDataField("conta", account);
		postPassPageOptions.setDataField("Senha", password);

		let reduceCookies;
		options.reduce(function(promise, currOptions, index) {
			return promise
			.then(async function (prevOptionsResult) {
				if(prevOptionsResult) {
					reduceCookies = await getCookies(prevOptionsResult.res);
					await currOptions.handleCookies(lastUsedCookies, reduceCookies);
				}
				logger.info("currOptions " + JSON.stringify(currOptions))
				let result = await request(currOptions);

				if(index >= options.length - 1) {
					resolve();
				}
				return result;

			})
		}, Promise.resolve(initialPage));
	})
};

const getBalance = () => {
	return requestPromise = new Promise(function(resolve, reject) {
		let data = {};
	
		if(!lastUsedCookies) {
			reject();
		}
	
		getBalanceOptions.appendCookies(lastUsedCookies);
	
		let getBalance =  request(getBalanceOptions);
	
		let freeBalance = getBalance.body.match(/contaCorrente_campo1&quot;&gt;&amp;nbsp;R\$ ([\d|,|.]*?)&amp;nbsp;&lt;\/td&gt;&#xD;&#xA;&lt;\/tr&gt;&#xD;&#xA;&lt;tr class=/)[1]
	
		let automaticRetrieve = getBalance.body.match(/contaCorrente_campo1&quot;&gt;&amp;nbsp;R\$ ([\d|,|.]*?)&amp;nbsp;&lt;\/td&gt;&#xD;&#xA;&lt;\/tr&gt;&#xD;&#xA;&lt;\//)[1]
	
		freeBalance = ParsedNumberFormatToFloat(freeBalance);
		automaticRetrieve = ParsedNumberFormatToFloat(automaticRetrieve);
	
		data.balance = (parseFloat(freeBalance) + parseFloat(automaticRetrieve)).toFixed(2);
	
		resolve(data);
	});
};

const request = (options) => {
	return requestPromise = new Promise(function(resolve, reject) {
		const req = https.request(options, (res) => {
			let body;
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
				body = chunk;
				logger.info("body " + body);
			});
			res.on('end', () => {
				if(options.isResultCorrect(res)) {
					logger.info(options.isResultCorrect(res));
					resolve({res: res, body: body});
				} else {
					reject();
				}
			});
		});

		req.on('error', (e) => {
			logger.error(`problem with request: ${e.message}`);
		});

		if(options.method == "POST") {
			if(options.data) {
				const postData = querystring.stringify(options.data);
				logger.info('postData ' + JSON.stringify(postData))
				req.write(postData);
			}
		}

		req.end();

	});
};

const getCookies = function(srcOptions) {
	let cookies;
	if(srcOptions) {
		let strCookies = srcOptions.headers["set-cookie"].toString();
		cookies = strCookies
		.replace(/HttpOnly\W+/g,'')
		.replace(/path\W+/g,'');
	}
	return cookies;
};

const ParsedNumberFormatToFloat = function(parsedNumber) {
	return parsedNumber.replace('.', '').replace(',', '.');
};

module.exports = { login, getBalance }
