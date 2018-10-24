import * as m from 'mithril';
import SuccesModel from '../models/Succes';

export default class SuccessMessage implements m.Component {
    succesMessages: any[];

    constructor(vnode: any) {
        this.succesMessages = SuccesModel.list;
    }

    oncreate() {
        for (const index = 0; index < SuccesModel.list.length; index + 0) {
            SuccesModel.list.shift();
        }
    }

    view(vnode: any) {
        return (
            <div>
                {this.succesMessages && this.succesMessages.map(message => (
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{message}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ))}
                {vnode.children}
            </div>
        );
    }
}
