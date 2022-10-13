# Setup guide

## Create single-spa

```sh
npx create-single-spa --moduleType root-config

> Need to install the following packages:
>   create-single-spa@x.x.x
> Ok to proceed? (y) y
> ? Directory for new project mf-single-spa
> ? Which package manager do you want to use? npm
> ? Will this project use Typescript? Yes
> ? Would you like to use single-spa Layout Engine No   # this is mostly for server side rendering
> ? Organization name (can use letter, numbers, dash or underscore) test-org
```

## Correct a build error

https://github.com/single-spa/single-spa/issues/1043
For now, just add any to registerApplication and it will work.

src/test-org-root-config.ts

```ts
...
registerApplication<any>({
  name: "@single-spa/welcom",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: ["/"],
});
...
```

## Run the newly created project

```sh
npm start
```

And open: **http://localhost:9000**

## Create pages and navbar

### Create navbar

```sh
npx create-single-spa

? Directory for new project .
? Select type to generate single-spa application / parcel
? Which framework do you want to use? angular
? Project name navbar
? Would you like to add Angular Routing? (y/N) N
? Which stylesheet format would you like to use? Less
? Would you like to proceed? (Y/n) Y
? Does you application use Angular routing? (Y/n) n
? What port should your project run on? (4200) 4200
```

### Create homepage

```sh
npx create-single-spa

? Directory for new project .
? Select type to generate single-spa application / parcel
? Which framework do you want to use? angular
? Project name homepage
? Would you like to add Angular Routing? (y/N) N
? Which stylesheet format would you like to use? Less
? Would you like to proceed? (Y/n) Y
? Does you application use Angular routing? (Y/n) n
? What port should your project run on? (4200) 4201
```

### Create aboutpage

```sh
npx create-single-spa

? Directory for new project .
? Select type to generate single-spa application / parcel
? Which framework do you want to use? angular
? Project name aboutpage
? Would you like to add Angular Routing? (y/N) N
? Which stylesheet format would you like to use? Less
? Would you like to proceed? (Y/n) Y
? Does you application use Angular routing? (Y/n) n
? What port should your project run on? (4200) 4202
```

### Create contactpage

```sh
npx create-single-spa

? Directory for new project .
? Select type to generate single-spa application / parcel
? Which framework do you want to use? angular
? Project name contactpage
? Would you like to add Angular Routing? (y/N) N
? Which stylesheet format would you like to use? Less
? Would you like to proceed? (Y/n) Y
? Does you application use Angular routing? (Y/n) n
? What port should your project run on? (4200) 4203
```

## Configure

test-org-root-config.ts

```ts
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
```

index.ejs add this anywhere to the head tag

```ejs
<% if (isLocal) { %>
  <script type="systemjs-importmap">
    {
      "imports": {
        "@test-org/root-config": "//localhost:9000/test-org-root-config.js",
        "@test-org/navbar": "//localhost:4200/main.js"
        "@test-org/homepage": "//localhost:4201/main.js"
        "@test-org/aboutpage": "//localhost:4202/main.js"
        "@test-org/contactpage": "//localhost:4203/main.js"
      }
    }
  </script>
<% } %>
```

Uncomment this line as well:

```ts
<script src='https://cdn.jsdelivr.net/npm/zone.js@0.11.3/dist/zpme.min.js'></script>
```

## Run it all to try it out

In navbar directory
```sh
npm run serve:single-spa:navbar
```

In homepage directory
```sh
npm run serve:single-spa:homepage
```

In aboutpage directory
```sh
npm run serve:single-spa:aboutpage
```

In contactpage directory
```sh
npm run serve:single-spa:contactpage
```

In project root
```sh
npm start
```

## Root coding

### Add angular material stuff

src/index.ejs
```html
...
<head>
  ...
  <title>Root Config</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  ...
</head>
...
```

## Navbar coding

### Add angular material with icons

I was for some reason unable to add this with ng so I had to go the npm way with more manual stuff.

```sh
npm i @angular/material
```

navbar/angular.json
```json
"styles": [
  "src/styles.less",
  "node_modules/@angular/material/prebuilt-themes/purple-green.css",
]
```
