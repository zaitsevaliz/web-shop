const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');//обработчик всех запросов корзины


app.use(express.json()); // Получение параметров строки POST-запроса, данные были отправлены в формате JSON
app.use('/', express.static('public')); //директория с frontend
app.use('/api/cart', cart);	// пользовательская функция обращения к корзине

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data); // ответ сервера
        }
    })
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));

// app.listen(3000, () => console.log('Listen on port 3000...'));