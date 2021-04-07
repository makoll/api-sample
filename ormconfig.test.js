// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./ormconfig');

const c = {
  ...config,
  host: 'localhost',
  port: 13306,
};

module.exports = c;
