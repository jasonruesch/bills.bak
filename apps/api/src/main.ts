/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as jsonServer from 'json-server';
import * as path from 'path';

const app = jsonServer.create();

const dbPath = path.join(__dirname, 'assets', 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

app.use(middlewares);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/api', router);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
