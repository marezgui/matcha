import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

const reactServer = () => {

  dotenv.load();
  const port = process.env.PORTREACT || 3000;
  const app = express();
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
  });
  app.listen(port);
  console.log(`App REACT is listening on port ${port}`);
};
export default reactServer;
