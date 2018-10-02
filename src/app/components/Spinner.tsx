import * as m from 'mithril';

class Spinner implements m.Component {
    isLoading: boolean;

    constructor(vnode: any) {
        this.isLoading = vnode.attrs.isLoading;
    }

    view(vnode: any) {
        return (
            <div>
                {vnode.attrs.isLoading ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="loader text-center" />
                        </div>
                    </div>
                    : vnode.children}
            </div>
        );
    }
}

export default Spinner;
