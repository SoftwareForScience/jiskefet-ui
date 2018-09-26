import * as m from 'mithril';
import '../scss/main.scss';
import 'bootstrap';
import { Layout } from './views/Layout';
import { Create } from './views/Home';

m.route(document.body, "/", {
	"/": {
		view: () => (
			<Layout>
				<Create />
			</Layout>
		)
	},
});