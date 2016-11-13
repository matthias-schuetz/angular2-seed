Angular 2 Seed
==============

## Angular 2 TypeScript starter project

### This branch uses [Pug](https://pugjs.org/) (former Jade) templates. For traditional HTML templates, switch to the [master branch](https://github.com/matthias-schuetz/angular2-seed/tree/master).

#### The new version 3.0.0 comes with major improvements and changes. Lazy loading has been removed and the production bundle consists of one "app.min.js" using Ahead-of-Time (AoT) compilation. Typings have been replaced with @types. TypeScript 2 is now being used togehter with version 3 of *gulp-typescript*. And E2E tests have been replaced with Karma unit tests and the Angular testing utilities.

This is an example app based on Angular 2. It relies on TypeScript, SystemJS, Gulp and Sass. The project comes with various features you may need to build a typical single page application (SPA). Here are the most important aspects:

 - a routing concept (separate route configuration file)
 - login and dashboard view components (authorized/public routes)
 - error page handling
 - a directive (form inputs)
 - a service (authorization)
 - a pipe (determine the active route)
 - a production bundle using Ahead-of-Time (AoT) compilation for one "app.min.js"
 - optional Pug (former Jade) templates for HTML
 - TSLint for integrated code checking
 - unit/regression test sample using Karma and Angular testing utilities
 - uses core-js, Reflect, Rx.js and Zone.js

The project was developed with an IDE in mind so the Gulp configuration works well with or without an editor that has integrated TypeScript/Sass compilation (like WebStorm or Visual Studio). Gulp is mandatory for copying Angular 2 and polyfills so you don't need to link to modules from *node_modules* inside your web app. Gulp can be used for compiling TypeScript/Sass and runnig a local web server with file watchers. There are also Gulp tasks for deploying a production environment: all JavaScript code gets bundled and minified into one final "app.min.js" using Ahead-of-Time (AoT) compilation and tree shaking (Rollup). CSS code will also be concatenated into a single file. The *index.html* contains a minimal pre-processing condition for production.

![Angular 2 Seed](http://matthias-schuetz.github.io/angular2-seed/angular2-seed.png?1 "Angular 2 Seed")

## Demo

There is an online demo [available here](http://matthiasschuetz.com/angular2-seed). This represents the compiled production version of the project which consists of only one *app.min.js* file.

## Usage

To use the Angular 2 seed, just clone this respository to your desktop. You need Node.js and npm to be installed. Afterwards, run the following commands to install all dependencies.

```html
$ npm install
```

From now on, the seed is ready to use. If you're developing in WebStorm or Visual Studio, you could just setup a new TypeScript project and compile the code via IDE. You can use Gulp to run a local web server that tracks file changes and triggers a browser reload automatically. Alternatively, you can use a certain Gulp task to start a local web server plus compile watchers for TypeScript/Sass: this task is designed for developers who like to compile all code via Gulp. The Gulp file is structured and there are 5 main tasks that do all of the jobs. TSLint has been added so all tasks include a TypeScript code check before building the app.

```html
$ gulp

Build/serve/watch dev environment on port 8080 (copies Angular 2 UMD bundles and compiles TypeScript/Sass on start, no compilation of TypeScript/Sass/Pug during watch task, suitable for IDEs)
```

```html
$ gulp start:dev

Build/serve/watch dev environment on port 8080 (copies Angular 2 UMD bundles, compiles TypeScript/Sass/Pug during watch task)
```

```html
$ gulp start:dev:separate

Same as 'start:dev' but copies all app files into a separate dev directory (JS/CSS files will also be compiled into that directory only)
```

```html
$ gulp build:dev

Build dev environment (copies Angular 2 UMD bundles files and compiles TypeScript/Sass/Pug)
```

```html
$ gulp build:dev:separate

Same as 'build:dev' but copies all app files into a separate dev directory (JS/CSS files will also be compiled into that directory only)
```

```html
$ gulp start:prod

Build/serve prod environment on port 8081 (compiles app into one "app.min.js" file, copies CSS/static files, no watch task, only for deployment)
```

```html
$ gulp build:prod

Build prod environment (compiles TypeScript/Sass/Pug, processes index.html, bundles vendor and Angular 2 JS files into one "app.min.js" file, bundles CSS into one file and copies static files into dist/ folder)
```

```html
$ gulp test:unit

Runs Karma unit tests based on the Angular testing utilities
```

All Gulp tasks are also documented at the top of the *gulpfile.js*.

## Gulp configuration

Gulp is used to execute various tasks and if you don't want to use it for compilation, you'll need it at least for copying the Angular 2 files and creating a production bundle of your app. All Gulp tasks are based on configuration settings that are specified at the top of the *gulpfile.js*. You can adjust all path and file settings here. Here's an extract of the Gulp configuration.

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
```

## File structure

The seed was developed with simplicity in mind, web apps get complex soon enough. The project was designed in a way that there aren't any copy tasks. So when developing, you only work inside the *app/* directory. TypeScript and Sass files will be compiled into their respective folder locations beside the TS and SCSS files. The Sass structure was inspired by the [7-1 architecture pattern](https://github.com/HugoGiraudel/sass-boilerplate) and inside the *app/styles/* directory, you'll also find Angular component styles. These files won't be included in the main *app.css* since they're referenced in the respective Angular components.

The included web server sets up the *app/* directory as *root* path so everything starts from here during development. The Angular 2 UMD bundles and necessary polyfills (like core-js, Reflect, Rx.js and Zone.js) are copied into the *app/src/vendor/node_modules/* directory. So everything is accessible inside the *app/* folder. If you run one of the production tasks like "gulp start:prod", a *dist/* directory will be created on the root level. This directory contains a minified *app.min.js* file with all JavaScript code and an *app.css*. Here's a short extract of the file structure to get a final picture.

```html
├ app/
  ├ assets/
  ├ src/
  ├ styles/
  ├ dist.body.html
  ├ dist.head.html
  ├ index.html
  └ system.conf.js
├ node_modules/
├ aot-rollup-config.js
├ gulpfile.js
├ karma.conf.js
├ karma-test-shim.js
├ tsconfig.json
├ tsconfig-aot.json
└ tslint.json
```

## Browser support

The Angular 2 seed runs on all major browsers including Internet Explorer 11+, Edge, Firefox, Chrome, Opera and Safari.

## License

The Angular 2 seed is released under the MIT license.

