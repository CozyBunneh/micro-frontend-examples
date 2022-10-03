import { registerApplication, start } from 'single-spa';

registerApplication<any>({
  name: '@test-org/navbar',
  app: () => System.import('@test-org/navbar'),
  activeWhen: ['/'],
});

registerApplication<any>({
  name: '@test-org/homepage',
  app: () => System.import('@test-org/homepage'),
  activeWhen: [(location) => location.pathname === '/'],
});

registerApplication<any>({
  name: '@test-org/aboutpage',
  app: () => System.import('@test-org/aboutpage'),
  activeWhen: ['/about'],
});

registerApplication<any>({
  name: '@test-org/contactpage',
  app: () => System.import('@test-org/contactpage'),
  activeWhen: ['/contact'],
});

start({
  urlRerouteOnly: true,
});
