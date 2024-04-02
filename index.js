const express =require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')
require('./startup/prod')(app);

let port;

port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}`));