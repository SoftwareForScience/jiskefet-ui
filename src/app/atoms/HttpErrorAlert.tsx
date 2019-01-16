/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import State from '../models/State';
import { HttpError } from '../interfaces/HttpError';
import { MithrilTsxComponent } from 'mithril-tsx-component';

type Vnode = m.Vnode<{}, HttpErrorAlert>;

export default class HttpErrorAlert extends MithrilTsxComponent<{}> {
    view(vnode: Vnode) {
        const errors: HttpError[] = State.HttpErrorModel.getErrors();
        return (
            <div>
                {(errors && errors.length > 0) ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                            {errors.map((error: HttpError) => {
                                    return (
                                        // tslint:disable-next-line:jsx-key
                                        <div class="alert alert-danger">
                                            <h4 class="alert-heading">{error.statuscode} {error.error}</h4>
                                            <p>{error.message}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                 : vnode.children}
            </div>
        );
    }
}
