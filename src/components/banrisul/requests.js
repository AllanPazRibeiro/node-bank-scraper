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
	getLoginSenhaPageOptions,
	postLoginSenhaPageOptions,
	getBalanceOptions
} = require('./headers.js')

let lastUsedCookies;

const login = async (branch, account, password) => {
	return requestPromise = new Promise(async function(resolve, reject) {
		let initialPage = await request(initialPageOptions);
		if(!initialPage) {
			reject();
		}
	
		if(!lastUsedCookies) {
			lastUsedCookies = await GetCookies(initialPage.res);
		}
	
		options = [
			formPageOptions,
			whtPageOptions,
			getLoginPageOptions,
			postLoginPageOptions,
			getLoginSenhaPageOptions,
			postLoginSenhaPageOptions
		];
	
		postLoginPageOptions.setDataField("agencia", branch);
		postLoginPageOptions.setDataField("conta", account);
		postLoginSenhaPageOptions.setDataField("Senha", password);

		options.reduce(async function(promise, currOptions, index) {
			return promise
			.then(async function (prevOptionsResult) {
				await currOptions.handleCookies(lastUsedCookies, await GetCookies(prevOptionsResult.res));
				logger.info("currOptions " + JSON.stringify(currOptions));
				try {
					let result = await request(currOptions);
					logger.info("result " + JSON.stringify(result.res));
					if(index >= options.length - 1) {
						resolve();
					}
					return result;
		
				} catch (err) {
					reject();
				}
				
			})
		}, Promise.resolve(initialPage));
	})
};

const getBalance = async () => {
	return requestPromise = new Promise(async function(resolve, reject) {
		let data = {};
	
		if(!lastUsedCookies) {
			reject();
		}
	
		getBalanceOptions.appendCookies(lastUsedCookies);
	
		let getBalance = await request(getBalanceOptions);
	
		let freeBalance = getBalance.body.match(/contaCorrente_campo1&quot;&gt;&amp;nbsp;R\$ ([\d|,|.]*?)&amp;nbsp;&lt;\/td&gt;&#xD;&#xA;&lt;\/tr&gt;&#xD;&#xA;&lt;tr class=/)[1]
	
		let automaticRetrieve = getBalance.body.match(/contaCorrente_campo1&quot;&gt;&amp;nbsp;R\$ ([\d|,|.]*?)&amp;nbsp;&lt;\/td&gt;&#xD;&#xA;&lt;\/tr&gt;&#xD;&#xA;&lt;\//)[1]
	
		freeBalance = ParsedNumberFormatToFloat(freeBalance);
		automaticRetrieve = ParsedNumberFormatToFloat(automaticRetrieve);
	
		data.balance = (parseFloat(freeBalance) + parseFloat(automaticRetrieve)).toFixed(2);
	
		resolve(data);
	});
};

const request = async (options) => {
	return requestPromise = new Promise(function(resolve, reject) {
		const req = https.request(options, (res) => {
			let body;
			res.setEncoding('utf8');
			res.on('data', (chunk) => {
				body = chunk;
				logger.info("body " + JSON.stringify(body));
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
				req.write(postData);
			}
		}

		req.end();

	});
};

const GetCookies = (srcOptions) => {
	if(srcOptions) {
		let strCookies = srcOptions.headers["set-cookie"].toString();
		let cookies = strCookies
		.replace(/path=\/; HttpOnly,/g,'')
		.replace(/path=\/,/g,'')
		.replace(/path=\//g,'');
		return cookies;
	}	
};

const ParsedNumberFormatToFloat = (parsedNumber) => {
	return parsedNumber.replace('.', '').replace(',', '.');
};

module.exports = { login, getBalance }
