const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'start',

  exposes: {
    // './Component': './projects/start/src/app/app.component.ts',
    './Module': './projects/start/src/app/modules/start/start.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
