[![Build Status](https://travis-ci.com/SoftwareForScience/jiskefet-ui.svg?branch=develop)](https://travis-ci.com/SoftwareForScience/jiskefet-ui)

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
