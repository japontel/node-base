const express = require('express');
const  cors = require('cors');
const routerApi = require('./routes');

const  { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

// const whiteList = ['http://localhost:8080'];
// const options = {
//   origin: (origin, callback) => {
//     if (whiteList.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Does not allowed'))
//     }
//   }
// }
app.use(cors());

app.get('/', (request, response) => {
  response.send('Hola mi server en express');
})
//
// app.get('/nueva-ruta', (request, response) => {
//   response.send('Hola soy una nueva ruta');
// })
//
// app.get('/categories/:categoryId/products/:productId', (req, res) => {
//   const {categoryId, productId} = req.params;
//   res.json({
//       categoryId,
//       productId
//   });
// })

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
})
