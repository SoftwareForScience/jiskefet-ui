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
import UnauthorizedLayout from './components/UnauthorizedLayout';
import Runs from './views/Runs';
import Logs from './views/Logs';
import Log from './views/Log';
import Run from './views/Run';
import CreateLog from './views/CreateLog';
import * as Cookie from 'js-cookie';
import Login from './views/Login';
// import { request } from './request';

m.route.prefix('');

const  authenticatedRoutes = {
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

const lockedOutRoutes = {
    '/': {
        view: () => (
            <UnauthorizedLayout>
                <Login />
            </UnauthorizedLayout>
        ),
    },
    '/callback': {
        view: () => (
            <UnauthorizedLayout>
                <Login />
                Callback called!
            </UnauthorizedLayout>
        ),
    }
};

// const validate = (jwtToken: string) => {
//     return request({
//         method: 'GET',
//         url: `${process.env.API_URL}login`
//     });
// };

export const initialize = () => {
    const token = Cookie.get('token');
    console.log('token: ' + token);
    if (token) {
        m.route(document.body, '/', authenticatedRoutes);
        m.route.set('/');
        // validate(token).then(
        //     () => m.route(document.body, '/', authenticatedRoutes),
        //     () => m.route(document.body, '/login', lockedOutRoutes)
        // );
    } else {
        m.route(document.body, '/', lockedOutRoutes);
        m.route.set('/');
    }
};

initialize();
