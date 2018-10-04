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
            <div className="feedback-block">
                {this.hasFetched ?
                    <div class="feeback">
                        {this.hasFailed ?
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>{this.failedMessage}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            :
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>{this.succesMessage}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>}
                    </div>
                    : 'uberhaupt niks gefetched'}
            </div>
        );
    }
}

export default Feedback;
