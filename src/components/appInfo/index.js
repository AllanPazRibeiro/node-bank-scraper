const { app, apiRouter } = require('interfaces/http');
app.use('banrisul/', require('./routes'));
apiRouter.use('banrisul/', require('./routes'));