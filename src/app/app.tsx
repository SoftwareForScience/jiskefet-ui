import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import { Layout } from './Layout';
import { Runs } from './views/Runs';
import { Logs } from './views/Logs';
import { Log } from './views/Log';
import { CreateRun } from './views/CreateRun';
import { Run } from './views/Run';
import { CreateLog } from './views/CreateLog';

m.route(document.body, '/logs', {
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
                {console.log('logs/create')}

                <CreateLog />
            </Layout>
        ),
    },
    '/logs/:id': {
        view: (vnode) => (
            <Layout>
                {console.log('logs/id')}
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
    '/runs/create': {
        view: () => (
            <Layout>
                {console.log('runs/create')}
                <CreateRun />
            </Layout>
        ),
    },
    '/runs/:id': {
        view: () => (
            <Layout>
                {console.log('runs/id')}
                <Run />
            </Layout>
        ),
    },
});
