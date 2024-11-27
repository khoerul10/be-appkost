const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@config': path.resolve(__dirname, 'src/config/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@utils': path.resolve(__dirname, 'src/utils/')
    }
  }
};
