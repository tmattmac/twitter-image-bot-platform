const { post } = require('./index');

post({ attributes: { id: '1359333490639175681', enabled: 'true' } }).then(() =>
  process.exit(0)
);
