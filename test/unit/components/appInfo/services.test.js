const { expect } = require('chai');
describe('AppInfo Service', () => {
    it('should return correct version and app name', function(){
        const service = require('components/appInfo/services');
        process.env.APP_NAME = 'clm-core';
        process.env.APP_VERSION = '1.0.0';

        const { appName, appVersion } = service.appInfo();
        expect(appName).to.equal( process.env.APP_NAME);
        expect(appVersion).to.equal(process.env.APP_VERSION);
    });
});
