import * as m from 'mithril';
import { Topbar } from './components/Topbar';

export class Layout implements m.Component {
    view(vnode: any) {
        return (
            <div>
                <Topbar/>
                <div className="main-content">
                    {vnode.children}
                </div>
            </div>
        );
    }
}