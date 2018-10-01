import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import { Layout } from './Layout';
import { Runs } from './views/Runs';
import { Create } from './views/Create';

m.route(document.body, '/', {
'/': {
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