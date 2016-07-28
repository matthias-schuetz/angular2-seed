Angular 2 Seed
==============

## Angular 2 TypeScript starter project [for RC4]

This is an example app based on Angular 2. It relies on TypeScript, SystemJS, Gulp and Sass. The project comes with various features you may need to build a typical single page application (SPA). Here are the most important aspects:

 - a routing concept (separate route configuration file)
 - login and dashboard view components (authorized/public routes)
 - error page handling
 - a directive (form inputs)
 - a service (authorization)
 - a pipe (determine the active route)
 - uses es6-shim, Reflect, Rx.js and Zone.js

The project was developed with an IDE in mind so the Gulp configuration works well with or without an editor that has integrated TypeScript/Sass compilation (like WebStorm or Visual Studio). Gulp is mandatory for the creation of the **Angular 2 bundle** and copying polyfills so you don't need to link to modules from *node_modules* inside your web app. Gulp can be used for compiling TypeScript/Sass and runnig a local web server with file watchers. There are also Gulp tasks for deploying a production environment: all JavaScript and CSS code will be concatenated into a single file. The *index.html* contains a minimal pre-processing condition for production.

![Angular 2 Seed](http://matthias-schuetz.github.io/angular2-seed/angular2-seed.png?1 "Angular 2 Seed")

## Demo

There is an online demo [available here](http://matthiasschuetz.com/angular2-seed). This represents the compiled project which uses SystemJS and Angular 2 RC4. The demo doesn't make use of the production feature of the seed. The production Gulp task will bundle all JS and CSS code into one file.

## Usage

To use the Angular 2 seed, just clone this respository to your desktop. You need Node.js and npm to be installed. You also need [Typings](https://github.com/typings/typings) to be installed globally. Afterwards, run the following commands to install all dependencies.

```html
$ npm install typings -g
$ npm install
$ typings install
```

From now on, the seed is ready to use. If you're developing in WebStorm or Visual Studio, you could just setup a new TypeScript project and compile the code via IDE. You can use Gulp to run a local web server that tracks file changes and triggers a browser reload automatically. Alternatively, you can use a certain Gulp task to start a local web server plus compile watchers for TypeScript/Sass: this task is designed for developers who like to compile all code via Gulp. The Gulp file is structured and there are 5 main tasks that do all of the jobs. TSLint has been added so all tasks include a TypeScript code check before building the app.

```html
$ gulp

Build/serve/watch dev environment on port 8080 (builds Angular 2 bundle and TypeScript/Sass on start, no compilation of TypeScript/Sass during watch task, suitable for IDEs)
```

```html
$ gulp start:dev

Build/serve/watch dev environment on port 8080 (builds Angular 2 bundle, compiles TypeScript/Sass during watch task)
```

```html
$ gulp build:dev

Build dev environment (builds Angular 2 bundle and compiles TypeScript/Sass)
```

```html
$ gulp start:prod

Build/serve prod environment on port 8081 (builds Angular 2 bundle and TypeScript/Sass on start, no watch task, only for deployment)
```

```html
$ gulp build:prod

Build prod environment (compiles TypeScript/Sass, processes index.html, bundles app and Angular2 JS files into one file, bundles CSS into one file and copies static files into dist/ folder)
```

```html
$ gulp test:e2e

Runs all E2E tests (assumes that dev server is running on port 8080, which is set as 'baseUrl' in protractor.conf)
```

All Gulp tasks are also documented at the top of the *gulpfile.js*.

## Gulp configuration

Gulp is used to execute various tasks and if you don't want to use it for compilation, you'll need it at least for building the Angular 2 bundle and a production bundle of your app. All Gulp tasks are based on configuration settings that are specified at the top of the *gulpfile.js*. You can adjust all path and file settings here, including the SystemJS configuration which builds the Angular 2 bundle using the [SystemJS Build Tool](https://www.npmjs.com/package/systemjs-builder). Here's an extract of the Gulp configuration.

```javascript
var paths = {
	sassSrc: ...,
	typescriptSrc: ...,

	vendorJsLibs: {
		dev: [...],
		prod: {
			bundle: [...],
			copy: [...]
		}
	},

	dev: {...},
	prod: {...}
};

var systemjsConfig = {
	baseURL: './',
	defaultJSExtensions: true,
	paths: {...},
	map: {...},
	packages: {...}
};
```

## File structure

The seed was developed with simplicity in mind, web apps get complex soon enough. The project was designed in a way that there aren't any copy tasks. So when developing, you only work inside the *app/* directory. TypeScript and Sass files will be compiled into their respective folder locations beside the TS and SCSS files. The Sass structure was inspired by the [7-1 architecture pattern](https://github.com/HugoGiraudel/sass-boilerplate) and inside the *app/styles/* directory, you'll also find Angular component styles. These files won't be included in the main *app.css* since they're referenced in the respective Angular components.

The included web server sets up the *app/* directory as *root* path so everything starts from here during development. The Angular 2 bundle and necessary polyfills (like es6-shim, Reflect, Rx.js and Zone.js) are compiled/copied into the *app/src/vendor/node_modules/* directory. So everything is accessible inside the *app/* folder. If you run one of the production tasks like "gulp start:prod", a *dist/* directory will be created on the root level. This directory contains a minified *app.js* file with all JavaScript code and an *app.css*. Beware that existing component CSS files will be copied to *dist/styles/components/* since they are used by the Angular components directly. Here's a short extract of the file structure to get a final picture.

```html
├ app/
  ├ assets/
  ├ src/
  ├ styles/
  ├ dist.head.html
  ├ index.html
  └ system.conf.js
├ node_modules/
├ typings/
├ gulpfile.js
├ tsconfig.json
├ tslint.json
└ typings.json
```

## Browser support

The Angular 2 seed runs on all major browsers including Internet Explorer 11+, Edge, Firefox, Chrome, Opera and Safari.

## License

The Angular 2 seed is released under the MIT license.