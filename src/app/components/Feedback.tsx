import * as m from 'mithril';

class Feedback implements m.Component {
    hasFetched: boolean;
    hasFailed: boolean;
    failedMessage: any;
    succesMessage: any;

    constructor(vnode: any) {
        this.hasFetched = vnode.attrs.hasFetched;
        this.hasFailed = vnode.attrs.isFailed;
        this.failedMessage = vnode.attrs.failedMessage;
        this.succesMessage = vnode.attrs.succesMessage;
    }

    view(vnode: any) {
        return (
            <div className="fb-message">
                {vnode.attrs.hasFetched ?
                    <label class="fb-label">
                        {this.hasFailed ? this.failedMessage : this.succesMessage}
                    </label>
                    : 'uberhaupt niks gefetched'}
            </div>
        );
    }
}

export default Feedback;
