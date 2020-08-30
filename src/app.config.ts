import { argv } from 'yargs';
export const REDIS = {
    host: argv.redis_host || 'localhost',
    port: argv.redis_port || 6379,
    // password: '123456',
    ttl: null,
    defaultCacheTTL: 60 * 60 * 24,
  };


  export const APP = {
    PORT: 3000
  }