require('infra/config')
const logger = require('infra/logger');
const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;
const loggerMiddleware = require('middleware/logger');
const swagger = express.Router();
const apiRouter =  express.Router();
const bodyParser = require("body-parser");
const swaggerMiddleware = require('../../components/swagger/swaggerMiddleweare')

app.use(loggerMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.get('/', function (req, res) {
	res.render('front');
});

app.use('/api', apiRouter);
apiRouter.use('/v1', swagger);
swagger.use('/doc', swaggerMiddleware);



httpServer.listen(port, function(){
	app._router.stack.forEach(function(r){
		if (r.route && r.route.path){
			logger.info(r.route.path)
		}
	})
	logger.info(`listening on *:${port}`);
});


module.exports = {
	httpServer,
	app,
	swagger
};