const express = require('express');
const app = express();

app
    .set('view engine', 'pug')
    .use(express.static('./'))
    // .use(require('./accounts'))
    .get('*', function(request, response) {
        response.render('index', {
            user: null // JSON.stringify(request.session.user || null)
        });
    })
    .listen(3000);