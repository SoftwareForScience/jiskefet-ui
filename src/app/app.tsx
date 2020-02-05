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
import * as Cookie from 'js-cookie';
import { ISetting } from './interfaces/Setting';
import { CronJob } from 'cron';
import { ISuccessObject } from './interfaces/ResponseObject';
import LogPage from './pages/LogPage';
import LogsPage from './pages/LogsPage';
import RunsPage from './pages/RunsPage';
import RunPage from './pages/RunPage';
import CreateLogPage from './pages/CreateLogPage';
import CreateTokenPage from './pages/CreateTokenPage';
import SubsystemsOverviewPage from './pages/SubsystemsOverviewPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AuthorizingPage from './pages/AuthorizingPage';
import { APPLICATION_NAME } from './constants/constants';
import TagsOverviewPage from './pages/TagsOverviewPage';

m.route.prefix('');
document.title = APPLICATION_NAME;
/**
 * Routes enabled when user is authenticated.
 */
const authenticatedRoutes = {
    '/': {
        view: () => (
            <LogsPage />
        ),
    },
    '/logs': {
        view: () => (
            <LogsPage />
        ),
    },
    '/logs/create': {
        view: () => (
            <CreateLogPage />
        ),
    },
    '/logs/create/runs/:id': {
        view: (vnode: m.Vnode<{ id: number }>) => (
            <CreateLogPage runNumber={vnode.attrs.id} />
        ),
    },
    '/logs/create/comments/:id': {
        view: (vnode: m.Vnode<{ id: number }>) => (
            <CreateLogPage logNumber={vnode.attrs.id} />
        ),
    },
    '/logs/:id': {
        view: (vnode: m.Vnode<{ id: number }>) => (
            <LogPage logId={vnode.attrs.id} />
        ),
    },
    '/runs': {
        view: () => (
            <RunsPage />
        ),
    },
    '/runs/:id': {
        view: (vnode: m.Vnode<{ id: number }>) => (
            <RunPage runNumber={vnode.attrs.id} />
        ),
    },
    '/subsystems': {
        view: () => (
            <SubsystemsOverviewPage />
        ),
    },
    '/tokens': {
        view: () => (
            <CreateTokenPage />
        ),
    },
    '/user/:userId': {
        view: (vnode: m.Vnode<{ userId: number }>) => (
            <ProfilePage userId={vnode.attrs.userId} />
        ),
    },
    '/tags': {
        view: () => (
            <TagsOverviewPage />
        ),
    }
};

/**
 * Routes enabled when user is not authenticated.
 */
const lockedOutRoutes = {
    '/': {
        view: () => (
            <LoginPage />
        ),
    },
    '/callback': {
        view: () => (
            <AuthorizingPage />
        ),
    }
};

/**
 * Determine the routing table for the app, based on if the user is logged in or not.
 * (logged in is in essence: does the user have a cookie with a JWT)
 */
export const initialize = () => {
    const allowAnonymous = process.env.ALLOW_ANONYMOUS;

    if (typeof(allowAnonymous) !== 'undefined' && allowAnonymous.toLowerCase() === 'true') {
        if (!Cookie.get('token')) {
            Cookie.set('token', 'TEST');
        }
    } else if (Cookie.get('token') && Cookie.get('token') === 'TEST') {
        Cookie.remove('token');
    }

    const token = Cookie.get('token');
    if (token) {
        m.route(document.body, '/', authenticatedRoutes);
    } else {
        m.route(document.body, '/', lockedOutRoutes);
    }
};

/**
 * Creates a request to the /setting endpoint in order to retrieve settings for the authentication and others.
 */
export const getSettings = () => {
    return m.request({
        method: 'GET',
        url: `${process.env.API_URL}setting`
    }).then((result: ISuccessObject<ISetting>) => {
        const settingsArray = Object.entries(result.data.item);
        settingsArray.forEach((setting: [string, string | number | boolean]) => {
            localStorage.setItem(setting[0], setting[1].toString());
        });
    });
};

/**
 * Schedule a daily cronjob to check if the settings are up to date.
 */
new CronJob('0 2 * * *', () => {
    getSettings();
}).start();

getSettings();
initialize();
