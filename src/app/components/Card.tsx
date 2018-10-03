import * as m from 'mithril';

export default class Card implements m.Component {
    data: any[];
    title: string;

    constructor(vnode: any) {
        this.data = vnode.attrs.run;
        this.title = vnode.attrs.title;
    }

    view() {
        return (
            <div className="card">
                <h4 className="card-header">{this.title}</h4>
                <div className="card-body">
                    <p className="card-text">
                        {Object.keys(this.data).map((key) =>
                            (<p key={this.data[key]}>
                                {key}: {this.data[key]}
                            </p>)
                        )}
                    </p>
                </div>
            </div>
        );
    }
}
