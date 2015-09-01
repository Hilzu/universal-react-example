require('babel/register');
const app = require('./app');

const port = process.env.PORT || 3000;
const host = 'localhost';

const server = app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
