/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import Layout from './components/Layout';
import Runs from './views/Runs';
import Logs from './views/Logs';
import Log from './views/Log';
import Run from './views/Run';
import CreateLog from './views/CreateLog';
import * as Cookie from 'js-cookie';
import Login from './views/Login';

m.route.prefix('');

const authenticated = {
    '/': {
        view: () => (
            <Layout>
                <Logs />
            </Layout>
        ),
    },
    '/logs': {
        view: () => (
            <Layout>
                <Logs />
            </Layout>
        ),
    },
    '/logs/create': {
        view: () => (
            <Layout>
                <CreateLog />
            </Layout>
        ),
    },
    '/logs/create/runs/:id': {
        view: (vnode: m.Vnode<{ id: number }>) => (
            <Layout>
                <CreateLog runNumber={vnode.attrs.id} />
            </Layout>
        ),
    },
    '/logs/:id': {
        view: (vnode: m.Vnode<{ id: number }>) => (
            <Layout>
                <Log id={vnode.attrs.id} />
            </Layout>
        ),
    },
    '/runs': {
        view: () => (
            <Layout>
                <Runs />
            </Layout>
        ),
    },
    '/runs/:id': {
        view: (vnode: m.Vnode<{ id: number }>) => (
            <Layout>
                <Run id={vnode.attrs.id} />
            </Layout>
        ),
    },
    '/callback': {
        view: () => (
            <Layout>
                <Login />
                Callback called!
            </Layout>
        ),
    }
};

const lockedOut = {
    '/': {
        view: () => (
            <Layout>
                <Login />
            </Layout>
        ),
    },
    '/callback': {
        view: () => (
            <Layout>
                <Login />
                Callback called!
            </Layout>
        ),
    }
};

// const validate = (jwtToken: string) => {
//     return m.request({
//         method: 'GET',
//         url: `${process.env.API_URL}login?token=${jwtToken}`,
//         withCredentials: false
//     });
// };

const token = Cookie.get('token');
console.log('token: ' + token);

if (token) { // logged in, sorta
    // User has just been authenticated!
    m.route(document.body, '/', authenticated);
// } else if (token) {
//     // We already have a token, could still be valid
//     m.route(document.body, '/login', lockedOut);
//     validate(token).then(
//         success => m.route(document.body, '/profile', authenticated),
//         failure => m.route(document.body, '/login', lockedOut)
//     );
} else {
    console.log('NOT LOGGED IN!');
    m.route(document.body, '/', lockedOut);
}
