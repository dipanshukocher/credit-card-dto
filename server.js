const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/Angular9/browser'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/Angular9/browser/index.html'));
});

app.listen(process.env.PORT || 8000);

console.log('listening app at post 8000.');