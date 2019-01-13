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
import CreateToken from './views/CreateToken';
import * as Cookie from 'js-cookie';
import Login from './views/Login';
import Profile from './views/Profile';
import SubsystemsOverview from './views/SubsystemsOverview';
import Loader from './components/Loader';

m.route.prefix('');
/**
 * Routes enabled when user is authenticated.
 */
const authenticatedRoutes = {
    '/': {
        view: () => (
            <Layout>
                <Logs />
            </Layout>
        ),
    },
    '/callback': {
        view: () => (
            <Layout>
                <Loader />
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
                <Log logId={vnode.attrs.id} />
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
                <Run runNumber={vnode.attrs.id} />
            </Layout>
        ),
    },
    '/subsystems': {
        view: () => (
            <Layout>
                <SubsystemsOverview />
            </Layout>
        ),
    },
    '/tokens': {
        view: () => (
            <Layout>
                <CreateToken />
            </Layout>
        ),
    },
    '/user/:userId': {
        view: (vnode: m.Vnode<{ userId: number }>) => (
            <Layout>
                <Profile userId={vnode.attrs.userId} />
            </Layout>
        ),
    }
};

/**
 * Routes enabled when user is not authenticated.
 */
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
            </UnauthorizedLayout>
        ),
    }
};
/**
 * Determine the routing table for the app, based on if the user is logged in or not.
 * (logged in is in essence: does the user have a cookie with a JWT)
 */
export const initialize = () => {
    const token = Cookie.get('token');
    if (token) {
        m.route(document.body, '/', authenticatedRoutes);
    } else {
        m.route(document.body, '/', lockedOutRoutes);
    }
};

initialize();
