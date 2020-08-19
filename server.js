import app from './app'
const port = process.env.PORT || 3000;
// this only possible in express version 4.16.0 onwards
// it is used to get the parsed data

app.listen(port, ()=>{
  console.log('app is listening on port 3000');
});