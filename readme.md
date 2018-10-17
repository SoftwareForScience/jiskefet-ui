[![Build Status](https://travis-ci.com/BastiaanReinalda/jiskefet-ui.svg?branch=master)](https://travis-ci.com/BastiaanReinalda/jiskefet-ui)

## Description
This bookkeeping system is a system for A Large Ion Collider Experiment
(ALICE) to keep track of what is happening to the data produced by the detectors. The electric signals produced by the various detectors which
together are the ALICE detector are being reconstructed, calibrated, compressed and used in numerous but specific ways. It is important to register  
how this is done to make a reproduction of data possible and thereby a validation of the information produced. The project is also known as the
Jiskefet project.  

This is the **front-end UI** for the Jiskefet project.   
The **back-end API** can be found here: https://github.com/BastiaanReinalda/jiskefet-api  
And the **Ansible playbook** to deploy the application can be found here: https://github.com/misharigot/sfs-ansible

## Installation

```bash
$ npm install
```

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

```JSON
{
		"bootstrap": "^4.1.3",
		"date-fns": "^1.29.0",
		"highlightjs": "^9.10.0",
		"jquery": "^3.3.1",
		"katex": "^0.10.0-rc.1",
		"mithril": "^1.1.6",
		"popper.js": "^1.14.4",
		"quill": "^1.3.6"
	}
```
