import 'module-alias/register';
import express from 'express';
import { connect } from '@core/database/connect';
import { BACKEND_PORT } from '@env';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authController } from './controllers/auth/auth.controller';
import { taskController } from './controllers/task/task.controller';
import { userAuthGuard } from './guards/user-auth.guard';

const app = express();

async function main() {
  try {
    await connect();
  } catch (err) {
    console.log('Cannot connect to database: ', err);
    process.exit(0);
  }

  await new Promise((resolve) => {
    app.listen(BACKEND_PORT || process.env.PORT, () => {
      console.log(`App is running on port: ${BACKEND_PORT}`);
      resolve('Ok');
    });
  });

  app.use(cors());

  app.use(bodyParser.json());

  app.use(authController);
  app.use(userAuthGuard(), taskController);
}

main();
