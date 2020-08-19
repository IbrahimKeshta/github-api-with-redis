import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json'

import routes from './app/routes/index.routes'

const app = express();
app.use(express.json());
app.use(logger('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes)
app.use( (req, res, next)=>{
  res.status(404);
  if (req.accepts('json')) {
    res.send({error: true, message: 'Route Not found' });
    return;
   }
});

export default app