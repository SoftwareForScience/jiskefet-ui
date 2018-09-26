import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import { Layout } from './views/Layout';
import { Table } from './views/Table';
import { Create } from './views/Create';

m.route(document.body, "/", {
	"/": {
		view: () => (
			<Layout>
				<Table />
			</Layout>
		)
	},
	"/create": {
		view: () => (
			<Layout>
				<Create />
			</Layout>
		)
	},
});