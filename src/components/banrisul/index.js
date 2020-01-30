const { app, apiRouter } = require('interfaces/http');
app.use('/', require('./routes'));
apiRouter.use('/', require('./routes'));