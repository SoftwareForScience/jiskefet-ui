# Jiskefet UI <!-- omit in toc -->

[![Build Status](https://travis-ci.com/SoftwareForScience/jiskefet-ui.svg?branch=develop)](https://travis-ci.com/SoftwareForScience/jiskefet-ui)

## Description <!-- omit in toc -->

This bookkeeping system is a system for A Large Ion Collider Experiment
(ALICE) to keep track of what is happening to the data produced by the detectors. The electric signals produced by the various detectors which
together are the ALICE detector are being reconstructed, calibrated, compressed and used in numerous but specific ways. It is important to register  
how this is done to make a reproduction of data possible and thereby a validation of the information produced. The project is also known as the
Jiskefet project.  

This is the **front-end UI** for the Jiskefet project.  
The **back-end API** can be found here: https://github.com/SoftwareForScience/jiskefet-api  
And the **Ansible playbook** to deploy the application can be found here: https://github.com/SoftwareForScience/sfs-ansible

## Table of Contents <!-- omit in toc -->

- [Running the app for **dev**](#running-the-app-for-dev)
- [Running the app for **prod**](#running-the-app-for-prod)
- [Documentation](#documentation)
  - [Mithril (SPA Framework)](#mithril-spa-framework)
  - [Sass/SCSS (Styling)](#sassscss-styling)
  - [Bootstrap](#bootstrap)
  - [Redux (State management)](#redux-state-management)

## Running the app for **dev**

```bash
$ npm install

# Copy .env.dist as .env and set your own values.
$ cp .env .env.dist

# Running in watch mode (webpack-dev-server)
$ npm run dev
```

Then go to http://localhost:8080/ in your browser.

## Running the app for **prod**

```bash
$ npm install

# Copy .env.dist as .env and set your own values.
$ cp .env .env.dist

# The bundle is located at `dist/app.bundle.js`
$ npm run build
```

The bundle can then be served via a webserver, e.g. nginx.

## Documentation

The following section explains the stack of the project and links to docs.

### Mithril (SPA Framework)

We use Mithril as a SPA framework.  

- [Mithril official docs](https://mithril.js.org/)

### Sass/SCSS (Styling)

We use SCSS as an extension to vanilla css.

- [Sass readme in project](src/scss/README.md)
- [Sass official docs](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)

### Bootstrap

Bootstrap is used as a style/component library.

- [Bootstrap 4.2 official docs](https://getbootstrap.com/docs/4.2/getting-started/introduction/)

### Redux (State management)

- [Redux readme in project](src/app/redux/README.md)
- [Redux official docs](https://redux.js.org/introduction/getting-started)
