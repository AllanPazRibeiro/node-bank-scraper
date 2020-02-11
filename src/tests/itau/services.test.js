const chai = require('chai');
const seed = require('./seed');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const scraper = require('./../../components/itau/services');

describe('Itau Scraper', function () {
	context('Return Bank Info', function () {
		it('should return a object', async function() {
			const response = await scraper(seed.branch, seed.account, seed.password);
			expect(response.data).to.contain.keys(Object.keys(seed.responseObject));
		});
		
	});
});