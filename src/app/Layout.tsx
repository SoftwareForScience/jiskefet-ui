import * as m from 'mithril';
import { Topbar } from './components/NavBar';

export class Layout implements m.Component {
    view(vnode: any) {
        return (
            <div>
                <Topbar />
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 col-md-12 py-3">
                            <main>
                                {vnode.children}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
