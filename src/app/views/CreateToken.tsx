/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Event } from '../interfaces/Event';
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

    addToCreateToken = (event: Event) => {
        State.TokenModel.createToken[event.target.id] = event.target.value;
    }

    // Need to change
    saveTokenForUser() {
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
                                this.saveTokenForUser();
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
                            <div class="form-group">
                                <dt>
                                    <label for="subsystem">Select SubSystem:</label>
                                </dt>
                                <div class="field">
                                    <select
                                        id="subsystem"
                                        class="form-control"
                                        name="subsystem"
                                        required
                                        onclick={this.addToCreateToken}
                                    >
                                        <option value="acorde">ACORDE</option>
                                        <option value="bcm">BCM</option>
                                        <option value="cpv">CPV</option>
                                        <option value="dag">DAQ</option>
                                    </select>
                                </div>
                                <dl class="form-group">
                                    <dt class="input-label">
                                        <label autofocus="autofocus">Select role</label>
                                    </dt>
                                    <dd>
                                        <p>What the subsystem is allowed to do.</p>
                                    </dd>
                                </dl>
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
