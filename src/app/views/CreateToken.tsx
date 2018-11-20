/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import State from '../models/State';

interface Attrs {
    userId?: number;
    token?: string;
}

type Vnode = m.Vnode<Attrs, CreateToken>;

export default class CreateToken extends MithrilTsxComponent<Attrs> {

    addDescription = (content: string) => {
        State.TokenModel.createToken.description = content;
    }

    // Need to change
    saveToken(token: string | undefined) {
        if (token) {
            // console.log(uuid());
        }
        State.TokenModel.save();
    }

    view(vnode: Vnode) {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-9 mx-auto bg-light rounded p-4 shadow-sm">
                        <div><h2>Create a new token</h2></div>
                        <div>
                            <p> For a machine to make use of the Jiskefet Logging system it needs access, to get access
                                a token needs to be generated. The token is linked to your account.
                            </p>
                        </div>
                        <form
                            onsubmit={(event: Event) => {
                                event.preventDefault();
                                this.saveToken(vnode.attrs.token);
                            }}
                        >
                            <dl class="form-group">
                                <dt class="input-label">
                                    <label autofocus="autofocus">Token description</label>
                                </dt>
                                <dd>
                                    <input
                                        id="description"
                                        type="text"
                                        autofocus="autofocus"
                                        class="form-control"
                                        oninput={this.addDescription}
                                        required
                                    />
                                    <p class="note">What's the token for?</p>
                                </dd>
                            </dl>
                            <div class="dropdown">
                                <button
                                    class="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Choose a Subsystem
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                </div>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary">Generate Token</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
