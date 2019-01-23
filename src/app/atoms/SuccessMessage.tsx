/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { store } from '../redux/configureStore';
import { getSuccessMessages } from '../redux/ducks/success/operations';
import { selectSuccesMessages } from '../redux/ducks/success/selectors';
import Button, { ButtonType, ButtonClass } from './Button';

export default class SuccessMessage extends MithrilTsxComponent<{}> {
    successMessages: string[];

    async oninit() {
        const fetchedSuccessMessages = await store.dispatch(getSuccessMessages());
        this.successMessages = fetchedSuccessMessages;
    }

    async onupdate() {
        const successMessages = await selectSuccesMessages(store.getState());
        if (successMessages !== this.successMessages) {
            this.successMessages = successMessages;
            m.redraw();
        }
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
                                    <div
                                        class="alert alert-success alert-dismissible fade show jf-success-word-wrap"
                                        role="alert"
                                    >
                                        <strong>{message}</strong>
                                        <Button
                                            buttonType={ButtonType.BUTTON}
                                            buttonClass={ButtonClass.CLOSE}
                                            dataDismiss="alert"
                                            ariaLabel="Close"
                                            text={(<span aria-hidden="true">&times;</span>)}
                                        />
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
