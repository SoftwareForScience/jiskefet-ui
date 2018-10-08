import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import Layout from './Layout';
import Runs from './views/Runs';
import Logs from './views/Logs';
import Log from './views/Log';
import CreateRun from './views/CreateRun';
import Run from './views/Run';
import CreateLog from './views/CreateLog';

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
                <CreateLog />
            </Layout>
        ),
    },
    '/logs/:id': {
        view: (vnode) => (
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
    '/runs/create': {
        view: () => (
            <Layout>
                <CreateRun />
            </Layout>
        ),
    },
    '/runs/:id': {
        view: () => (
            <Layout>
                <Run />
            </Layout>
        ),
    },
});
