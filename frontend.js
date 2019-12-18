const express = require('express');
const path = require('path');
const app = express();

// express is not good for production static files, use cdn, or dedicated file server like ngnix, appache
app.use(express.static(path.join(__dirname, '.', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'build', 'index.html'));
});

const port = 3000;

app.listen(process.env.FRONTEND_HOST || port);

console.log(`Front end listening on port ${port}`);