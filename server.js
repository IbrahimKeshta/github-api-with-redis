import express from 'express';
import githubRoutes from './app/routes/github';
import logger from 'morgan';
const app = express();
const port = process.env.PORT || 3000;
// this only possible in express version 4.16.0 onwards
// it is used to get the parsed data
app.use(express.json());
app.use(logger('dev'));

app.use('/API/V1/github', githubRoutes)
app.use( (req, res, next)=>{
  res.status(404);
  if (req.accepts('json')) {
    res.send({error: true, message: 'Route Not found' });
    return;
   }
});
app.listen(port, ()=>{
  console.log('app is listening on port 3000');
});