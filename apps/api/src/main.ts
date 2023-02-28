/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { faker } from '@faker-js/faker';
import * as jsonServer from 'json-server';
import { bills } from './data/bills';

const data = {
  bills,
};

const app = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

// Override router's createId to return a UUID instead of an integer
router.db._.mixin({
  createId: () => faker.datatype.uuid(),
});

// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
app.use(jsonServer.bodyParser);

// app.use('/api/bills', (req, _, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = new Date();
//   } else if (req.method === 'PUT') {
//     req.body.updatedAt = new Date();
//   }

//   // Continue to JSON Server router
//   next();
// });

// Use default router
app.use('/api', router);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
