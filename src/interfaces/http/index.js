require('infra/config')
const logger = require('infra/logger');
const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;
const loggerMiddleware = require('middleware/logger');
const cors = require('cors');
const apiRouter =  express.Router();
const v1Router = express.Router();
const routes = require('../../routes');
const bodyParser = require("body-parser");

app.use(cors({
	origin: [
		`http://localhost:${process.env.PORT}`,
	],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(loggerMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api', apiRouter)
apiRouter.use('/v1', v1Router);

app.set('view engine', 'jade');
app.get('/home', function (req, res) {
	res.render('front');
});

app.use('/', routes);


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
	apiRouter,
	v1Router
};