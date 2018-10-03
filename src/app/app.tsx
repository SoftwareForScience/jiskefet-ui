import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import { Layout } from './Layout';
import { Runs } from './views/Runs';
import { Logs } from './views/Logs';
import { Log } from './views/Log';
import { Create } from './views/Create';
import { RunDetails } from './views/RunDetails';

m.route(document.body, '/logs', {
    '/logs': {
        view: () => (
            <Layout>
                <Logs />
            </Layout>
        ),
    },
    '/logs/:id': {
        view: (vnode: any) => (
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
    '/create': {
        view: () => (
            <Layout>
                <Create />
            </Layout>
        ),
    },
    '/run/:id': {
        view: () => (
            <Layout>
                <RunDetails />
            </Layout>
        ),
    },
});
