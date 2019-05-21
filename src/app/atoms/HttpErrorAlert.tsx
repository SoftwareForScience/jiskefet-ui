/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { IHttpError } from '../interfaces/HttpError';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { extractErrors } from '../redux/ducks/error/operations';
import { store } from '../redux/configureStore';
import { selectErrors } from '../redux/ducks/error/selectors';

interface Attrs {
    /**
     * Whether to hide the children when errors exist.
     */
    hideChildren?: boolean;
}

type Vnode = m.Vnode<Attrs, HttpErrorAlert>;

export default class HttpErrorAlert extends MithrilTsxComponent<Attrs> {
    errors: Array<IHttpError<any>> = [];

    async oninit() {
        const fetchedErrors = await store.dispatch(extractErrors());
        this.errors = fetchedErrors;
    }

    async onupdate() {
        const fetchedErrors = await selectErrors(store.getState());
        if (fetchedErrors !== this.errors) {
            this.errors = await fetchedErrors;
            m.redraw();
        }
    }

    view(vnode: Vnode) {
        const { errors } = this;
        return (
            <div>
                {(errors && errors.length > 0) &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                {errors.map((error: IHttpError<any>) => {
                                    return (
                                        // tslint:disable-next-line:jsx-key
                                        <div class="alert alert-danger">
                                            <h4 class="alert-heading">{error.error.code} {error.error.error}</h4>
                                            <p>{error.error.message}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                }
                {(!vnode.attrs.hideChildren || errors.length === 0) &&
                    vnode.children
                }
            </div>
        );
    }
}
