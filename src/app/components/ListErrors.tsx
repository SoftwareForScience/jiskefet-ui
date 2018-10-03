import * as m from 'mithril';

class ListErrors implements m.Component {
    errors: any;

    constructor(vnode: any) {
        this.errors = vnode.attrs.errors;
    }

    view(vnode: any) {
        return (
            <div class="error-messages">
                <ul key={this.errors}>
                    {this.errors ?
                        (Object.keys(this.errors).map((errorKey) =>
                            (<li key={this.errors[errorKey]}>
                                {this.errors[errorKey]}
                            </li>)))
                        : null}
                </ul>
            </div>
        );
    }
}

export default ListErrors;
