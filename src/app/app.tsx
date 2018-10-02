import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import { Layout } from './Layout';
import { Runs } from './views/Runs';
import { Logs } from './views/Logs';
import { Create } from './views/Create';

m.route(document.body, '/', {
    '/': {
        view: () => (
            <Layout>
                <Logs />
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
    'create': {
        view: () => (
            <Layout>
                <Create />
            </Layout>
        ),
    },
});
