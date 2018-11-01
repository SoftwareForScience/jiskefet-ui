[![Build Status](https://travis-ci.com/BastiaanReinalda/jiskefet-ui.svg?branch=master)](https://travis-ci.com/BastiaanReinalda/jiskefet-ui)

## Description
This bookkeeping system is a system for A Large Ion Collider Experiment
(ALICE) to keep track of what is happening to the data produced by the detectors. The electric signals produced by the various detectors which
together are the ALICE detector are being reconstructed, calibrated, compressed and used in numerous but specific ways. It is important to register  
how this is done to make a reproduction of data possible and thereby a validation of the information produced. The project is also known as the
Jiskefet project.  

This is the **front-end UI** for the Jiskefet project.   
The **back-end API** can be found here: https://github.com/SoftwareForScience/jiskefet-api  
And the **Ansible playbook** to deploy the application can be found here: https://github.com/SoftwareForScience/sfs-ansible

## Installation

```bash
$ npm install
```

Copy .env.dist as .env and set your own values.

## Running the app

```bash
# watch mode
$ npm run dev

# build minified
$ npm run build
```

Then go to http://localhost:8080/ in your browser.

## Dependencies

The project depends on the following packages in order to run properly.

Mithril is a modern client-side Javascript framework for building Single Page Applications.
It's small (< 8kb gzip), fast and provides routing and XHR utilities out of the box.
For the mitrhil docs click [here](https://mithril.js.org/api.html)
```
"mithril": "^1.1.6"
```

Bootstrap is a sleek, intuitive, and powerful front-end framework for faster and easier web development. 
For the bootstrap docs click [here](https://getbootstrap.com/)
```
"bootstrap": "^4.1.3"
```

Date-fns is a zero-dependency module that is able to manipulate JavaScript dates.
```
"date-fns": "^1.29.0"
```

Syntax highlighting for the Web.
```
"highlightjs": "^9.10.0"
```

JavaScript library for DOM operations.
```
"jquery": "^3.3.1"
```

KaTeX is a fast, easy-to-use JavaScript library for TeX math rendering on the web.
```
"katex": "^0.10.0-rc.1"
```

A popper is an element on the screen which "pops out" from the natural flow of your application.
Common examples of poppers are tooltips, popovers and drop-downs.
```
"popper.js": "^1.14.4"
```

MarkedJs is a low-level markdown compiler for parsing markdown without caching or blocking
for long periods of time.
```
"marked": "^0.5.1"
```
