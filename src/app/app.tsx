import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import { Layout } from './Layout';
import { Table } from './views/RunTable';
import { Create } from './views/Create';

m.route(document.body, '/', {
	'/': {
		view: () => (
			<Layout>
				<Table />
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
});