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
                            <div key={this.errors[errorKey]} class="alert alert-warning" role="alert">
                                {this.errors[errorKey]}
                            </div>
                        ))
                        : <div class="alert alert-info" role="alert">
                            Geen errors, goed gedaan pikkebaas!
                        </div>}
                </ul>
            </div>
        );
    }
}

export default ListErrors;
