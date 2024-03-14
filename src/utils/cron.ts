import * as cron from 'node-cron';

import { getAllUsers } from '../db/user';
import { setToZeroWordsCount } from '../logic/justifyText';

export default () =>
  cron.schedule(
    '0 0 * * *',
    async () => {
      const users = await getAllUsers();
      console.info('Before');
      users.forEach((user) => {
        console.info(user);
      });
      console.info(' --- Running task setting to 0 words count  --- ');
      await setToZeroWordsCount();
      const updatedUsers = await getAllUsers();
      console.info('After');
      updatedUsers.forEach((user: any) => {
        console.info(user);
      });
    },
    {
      timezone: 'Europe/Paris',
    },
  );
