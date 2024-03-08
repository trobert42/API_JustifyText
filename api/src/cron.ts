import { setToZeroWordsCount } from './controllers/controller';

const cron = require('node-cron');
const User = require('./models/user');

cron.schedule(
  '*/1 * * * *',
  async () => {
    const users = await User.getAllUsers();
    users.forEach((user: any) => {
      console.log(user);
    });
    console.log(' --- Running task setting to 0 words count  --- ');
    await setToZeroWordsCount();
    const updatedUsers = await User.getAllUsers();
    updatedUsers.forEach((user: any) => {
      console.log(user);
    });
  },
  {
    timezone: 'Europe/Paris',
  },
);
