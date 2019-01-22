# Redux <!-- omit in toc -->

Jiskefet uses [Redux](https://redux.js.org/introduction/getting-started) for state management.

Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as [live code editing combined with a time traveling debugger](https://github.com/zalmoxisus/redux-devtools-extension).

You can use Redux together with ~~React~~ Mithril, or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of addons available.

## Table of Contents <!-- omit in toc -->

- [Architecture (re-ducks)](#architecture-re-ducks)
- [Redux Devtools](#redux-devtools)
- [Reselect](#reselect)
- [Redux Thunk](#redux-thunk)

## Architecture (re-ducks)

Jiskefet uses the [re-ducks](https://github.com/alexnm/re-ducks) modular directory structure.

For more information, see [this Medium article](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be) covering the motivation for using the re-ducks approach.

## Redux Devtools

From the [Redux docs](https://redux.js.org/recipes/configuring-your-store#integrating-the-devtools-extension):
 > The extension is a suite of tools which give you absolute control over your Redux store - it allows you to inspect and replay actions, explore your state at different times, dispatch actions directly to the store, and much more.

[Redux Devtools Extension GitHub](https://github.com/zalmoxisus/redux-devtools-extension)

It is highly recommended to install the devtools when working with the state of Jiskefet. It can be done easily as a browser extension directly from your browser's store.

## Reselect

From the [reselect GitHub](https://github.com/reduxjs/reselect):
>Simple “selector” library for Redux (and others) inspired by getters in NuclearJS, subscriptions in re-frame and this proposal from speedskater.
>- Selectors can compute derived data, allowing Redux to store the minimal possible state.
>- Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
>- Selectors are composable. They can be used as input to other selectors.

## Redux Thunk

From the [redux-thunk GitHub](https://github.com/reduxjs/redux-thunk)

> Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.