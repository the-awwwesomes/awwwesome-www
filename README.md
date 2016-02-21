# Awwwesome WWW

Organization main webpage

## Prerequisites

Website setup is using gulp for minifying and injecting files. First, make sure you have:

- Node.js, 
- Gulp,
- Bower 

installed globally on your machine:

```bash
$ npm -v
$ gulp -v
$ bower -v
```

If not, [install the latest node version](https://docs.npmjs.com/getting-started/installing-node) for your operating system. Then install [gulp](http://gulpjs.com/) and [bower](http://bower.io/).

### Installing gulp and bower

Fisrt you need to install gulp globally via command line

```bash
$ npm install --global gulp-cli
```

Next go to the project directory and run

```bash
$ npm install --save-dev gulp
```

Install bower globally
```bash
$ npm install -g bower
```

## Project setup

After successfully installing prerequisites, fetch all required dependencies. Run these commands in the project main directory:

```bash
$ npm install
$ bower install
```

## Running project locally

To run project locally type in the project main directory

```bash
$ gulp serve:dev
```

This should inject all `*.js` and `*.css` files to `*.html` files and run the site on `localhost:8080`.

## Bundling files for production

To create minified versions of assets and link them to `*.html` files run

```bash
$ gulp bundle
```
To check if all works properly run

```bash
$ gulp serve:dist
```
