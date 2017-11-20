# FirstClassConnect

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - For this project, please use this one (node-v6.12.0.pkg) under dependencies.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ sudo npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g mocha
$ sudo npm install -g grunt-cli
$ sudo npm install -g grunt
```

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop you MEAN application.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application, to learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
######## don't know why below two need to run again without -g, in order to work #######
$ sudo npm install mocha
$ sudo npm install grunt
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application

## Running
After the install process is over, you'll be able to run your application using Grunt, just run :

```
$ npm start
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)

# FirstClassConnect
