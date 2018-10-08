import * as m from 'mithril';

export default class NavItem implements m.Component {
    private href: string;
    private title: string;

    constructor(vnode: any) {
        this.href = vnode.attrs.href;
        this.title = vnode.attrs.name;
    }

    view() {
        return (
            <li class={`nav-item ${this.href === m.route.get() && 'active'}`}>
                <a href={this.href} className="nav-link" oncreate={m.route.link}>{this.title}</a>
            </li>
        );
    }
}
