import * as m from 'mithril';

class Feedback implements m.Component {
    hasFetched: boolean;
    isFailed: boolean;
    failedMessage: any;
    succesMessage: any;

    constructor(vnode: any) {
        this.hasFetched = vnode.attrs.hasFetched;
        this.isFailed = vnode.attrs.isFailed;
        this.failedMessage = vnode.attrs.failedMessage;
        this.succesMessage = vnode.attrs.succesMessage;
    }

    view(vnode: any) {
        return (
            <div class="feedback-message">
                {vnode.atrrs.hasFetched ?
                    <label class="failed-message">
                        {vnode.attrs.isFailed ? vnode.attrs.failedMessage : vnode.attrs.succesMessage}
                    </label>
                    : null}
            </div>
        );
    }
}

export default Feedback;
