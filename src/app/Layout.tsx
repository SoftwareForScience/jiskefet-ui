import * as m from 'mithril';
import { NavBar } from './components/NavBar';
import { SideBar } from './components/SideBar';

export class Layout implements m.Component {
    view(vnode: any) {
        return (
            <div>

                <NavBar />
                <div id="wrapper" class="">
                        <SideBar />
                        <div id="page-content-wrapper">
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
                    </div>
                </div>
        );
    }
}
