/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import SuccesModel from '../models/Succes';

export default class SuccessMessage implements m.Component {

    onremove() {
        for (const index = 0; index < SuccesModel.list.length; index + 0) {
            SuccesModel.list.shift();
        }
    }

    view(vnode: any) {
        return (
            <div>
                {SuccesModel.list &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                {SuccesModel.list.map(e =>
                                    // tslint:disable-next-line:jsx-key
                                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>{e.toString()}</strong>
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
                {vnode.children}
            </div>
        );
    }
}
