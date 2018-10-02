import * as m from 'mithril';

export default class CardBody implements m.Component {
    data: any[];

    constructor(vnode: any) {
        this.data = vnode.attrs.run;
    }

    view() {
        return (
            <div className="card-body">
                <p className="card-text">
                    {Object.keys(this.data).map((key) =>
                        (<p key={this.data[key]}>
                            {key}: {this.data[key]}
                        </p>)
                    )}
                </p>
            </div>
        );
    }
}
