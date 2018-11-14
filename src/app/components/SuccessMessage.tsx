/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import State from '../models/State';
import { MithrilTsxComponent } from 'mithril-tsx-component';

type Vnode = m.Vnode<{}, SuccessMessage>;

export default class SuccessMessage extends MithrilTsxComponent<{}> {
    successMessages: string[];

    constructor(vnode: Vnode) {
        super();
        this.successMessages = State.SuccessModel.getSuccessMessages();
    }

    view() {
        return (
            <div>
                {this.successMessages &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                {this.successMessages.map((message: string) =>
                                    // tslint:disable-next-line:jsx-key
                                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>{message}</strong>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
