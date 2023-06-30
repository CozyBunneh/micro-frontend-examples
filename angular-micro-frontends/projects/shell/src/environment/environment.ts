export const environment = {
  production: false,

  microfrontends: [
    {
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      remoteName: "layout",
      components: [
        {
          exposedModule: "./Header",
          displayName: "Header",
          componentName: "HeaderComponent",
        },
        {
          exposedModule: "./Footer",
          displayName: "Footer",
          componentName: "FooterComponent",
        },
        {
          exposedModule: "./SideNav",
          displayName: "SideNav",
          componentName: "SideNavComponent",
        },
      ],
    },
  ],
  microfrontendRemoteEntries: {
    start: {
      url: "http://localhost:4202/remoteEntry.js",
    },
    about: {
      url: "http://localhost:4203/remoteEntry.js",
    },
  },
};
