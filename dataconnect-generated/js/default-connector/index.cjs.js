const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'ssp_nextjs',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

