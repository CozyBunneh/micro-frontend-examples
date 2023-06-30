const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'layout',

  exposes: {
    './Header': './projects/layout/src/app/modules/layout/header/header.component.ts',
    './SideNav': './projects/layout/src/app/modules/layout/side-nav/side-nav.component.ts',
    './Footer': './projects/layout/src/app/modules/layout/footer/footer.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
