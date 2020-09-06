import { argv } from 'yargs';
import path = require('path');

export const REDIS = {
    host: argv.redis_host || 'localhost',
    port: argv.redis_port || 6379,
    // password: '123456',
    ttl: null,
    defaultCacheTTL: 60 * 60 * 24,
  };


  export const APP = {
    PORT: 3000,
    URL: 'localhost:3000',
  }

  const packageJson = require(path.resolve(__dirname,'package.json'))
  export const INFO = {
    name: packageJson.name,
    version: packageJson.version,
    author: packageJson.author,
    site: APP.URL,
    homepage: packageJson.homepage,
    issues: packageJson.bugs.url
  };
  