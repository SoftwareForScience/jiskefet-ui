import * as m from 'mithril';
import { Topbar } from './topbar';

export class Layout implements m.Component {
    view(vnode) {
        return (
            <div>
                <Topbar/>
                <div className="main-content">
                    {vnode.children}
                </div>
            </div>
        )
    }
}