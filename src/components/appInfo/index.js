const { app, apiRouter } = require('interfaces/http');
app.use('/version', require('./routes'));
apiRouter.use('/version', require('./routes'));