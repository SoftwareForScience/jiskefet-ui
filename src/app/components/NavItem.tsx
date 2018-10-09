import * as m from 'mithril';

export class NavItem implements m.Component {
    private href: string;
    private title: string;
    private icon: string;

    constructor(vnode: any) {
        this.href = vnode.attrs.href;
        this.title = vnode.attrs.name;
        this.icon = vnode.attrs.icon;
    }

    view() {
        let text;
        if (this.icon === undefined) {
            text = <a href={this.href} className="nav-link" oncreate={m.route.link}>{this.title}</a>;
        } else {
            text = [(
                <a href={this.href} className="nav-link" oncreate={m.route.link}>
                    <span class={`fas ${this.icon}`} />
                    &nbsp;{this.title}</a>
            )];
        }

        return (
            <li class={`nav-item ${this.href === m.route.get() && 'active'}`}>
                {text}
            </li >
        );
    }
}
