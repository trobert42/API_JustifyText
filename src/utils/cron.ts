import * as cron from 'node-cron';

import { setToZeroWordsCount } from '../logic/justifyText';
import User from '../models/user';

export default () =>
  cron.schedule(
    '0 0 * * *',
    async () => {
      const users = await User.getAllUsers();
      console.log('Before');
      users.forEach((user: any) => {
        console.log(user);
      });
      console.log(' --- Running task setting to 0 words count  --- ');
      await setToZeroWordsCount();
      const updatedUsers = await User.getAllUsers();
      console.log('After');
      updatedUsers.forEach((user: any) => {
        console.log(user);
      });
    },
    {
      timezone: 'Europe/Paris',
    },
  );
