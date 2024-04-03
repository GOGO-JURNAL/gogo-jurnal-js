import 'dotenv/config';
import server from './application/server.js';
import { logs } from './application/logging.js';

server.listen(process.env.APP_PORT, () => {
  logs.info(`Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
