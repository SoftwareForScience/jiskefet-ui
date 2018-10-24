/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import HttpErrorModel from '../models/HttpError';

export default class HttpError implements m.Component {

    onupdate() {
        for (const index = 0; index < HttpErrorModel.errorList.length; index + 0) {
            HttpErrorModel.errorList.shift();
        }
    }

    view(vnode: any) {
        return (
            <div>
                {HttpErrorModel.errorList &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                {HttpErrorModel.errorList.map(e =>
                                    // tslint:disable-next-line:jsx-key
                                    <div class="alert alert-danger">
                                        {e.toString()}
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
