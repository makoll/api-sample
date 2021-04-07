import { config } from 'dotenv';
config();

import { AppServer } from '@/app';

const appServer = new AppServer();
appServer.init();
appServer.start();
