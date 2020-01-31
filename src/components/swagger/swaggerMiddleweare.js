const YAML = require('yamljs');
const SwaggerUi = require('swagger-ui-express');

const swaggerDocument = YAML.load(__dirname + '/swagger.yml');
module.exports = [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument)];
