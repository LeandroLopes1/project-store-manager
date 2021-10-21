const express = require('express');
const bodyParser = require('body-parser');
const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');

const app = express();
app.use(bodyParser.json());

app.use('/products', productRoute);

app.use('/sales', saleRoute);
 
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
const PORT = 3000;

app.listen(PORT, () => console.log(`Rodando aqui--> ${PORT}`));
