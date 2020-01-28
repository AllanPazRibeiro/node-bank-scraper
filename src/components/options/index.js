class BaseOptions {
	constructor() {}

	setMethod(method) {
		this.method = method;
	}

	setPath(path) {
		this.path = path;
	}

	setHeaders(headers) {
		this.headers = headers;
	}

	setData(data) {
		this.data = data;
	}

	setDataField(field, value) {
		this.data[field] = value;
	}

	setCookies(cookies) {
		this.headers["Cookie"] = cookies;
	}

	handleCookies(baseCookies, updatedCookies) {
		this.appendCookies(baseCookies);
		this.updateCookies(updatedCookies);
	}

	appendCookies(cookies) {
		this.headers["Cookie"] += '; ';
		this.headers["Cookie"] += cookies;
	}

	setHostname(hostname) {
		this.hostname = hostname;
	}

	setPort(port) {
		this.port = port;
	}

	setUrl(hostname, port, path) {
		this.url = hostname + port + path;
	}

	updateCookies(cookies) {
		let updatedCookies = this.headers["Cookie"];

		let separatedCookies = cookies.trim().split('; ');

		separatedCookies.forEach(cookie => {
			let nameAndValues = cookie.split('=');
			if(nameAndValues.length == 2) {
				let replace = nameAndValues[0] + '=\\w*;';
				let re = new RegExp(replace,"g");
				let newValue = nameAndValues[0] + "=" + nameAndValues[1] + ";";
				updatedCookies = updatedCookies.replace(re, newValue);
			}
		})

		this.headers["Cookie"] = updatedCookies;
	}

	isResultCorrect(requestResult) {
		return this.checkerMethod(requestResult);
	}

	checkerMethod(requestResult) {
		return true;
	}

	setCheckerMethod(newCheckerMethod) {
		this.checkerMethod = newCheckerMethod;
	}

}

module.exports = BaseOptions;
