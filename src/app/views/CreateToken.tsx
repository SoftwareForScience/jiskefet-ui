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
import { SubSystem } from '../interfaces/SubSytem';
import Table from '../components/Table';
import SubsystemPermissionColumns from '../constants/SubsystemPermissionColumns';

interface Attrs {
    userId?: number;
    token?: string;
}

type Vnode = m.Vnode<Attrs, CreateToken>;

export default class CreateToken extends MithrilTsxComponent<Attrs> {

    oninit() {
        State.SubsystemModel.fetch();
        State.AuthModel.fetchProfile().then(() => {
            if (State.AuthModel.profile !== null) {
                State.UserModel.fetchById(State.AuthModel.profile.id).then(() => {
                    State.SubsystemPermissionModel.fetch(State.UserModel.current.userId).then(() => {
                        State.SubsystemPermissionModel.createToken.user = State.UserModel.current;
                    });
                });
            }
        });
    }

    addDescription = (event: Event) => {
        State.SubsystemPermissionModel.createToken.subSystemTokenDescription = event.target.value;
    }

    addToCreateToken = (event: Event) => {
        State.SubsystemModel.fetchById(+event.target.value).then(() => {
            State.SubsystemPermissionModel.createToken.subsystem = State.SubsystemModel.current;
        });
    }

    saveTokenForUser() {
        State.SubsystemPermissionModel.createToken.isMember = true;
        State.SubsystemPermissionModel.createToken.editEorReason = true;
        State.SubsystemPermissionModel.save(State.SubsystemPermissionModel.createToken.user.userId);
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
                            onsubmit={this.saveTokenForUser}
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
                                        {
                                            State.SubsystemModel.list.map((sub: SubSystem) => (
                                                <option
                                                    value={sub.subsystemId}
                                                >
                                                    {sub.subsystemName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <dl class="form-group">
                                <dt class="input-label">
                                    <label autofocus="autofocus">Select role</label>
                                </dt>
                                <dd>
                                    <p>What the subsystem is allowed to do.</p>
                                </dd>
                            </dl>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Generate Token</button>
                            </div>
                        </form>
                        <hr />
                        <Table
                            data={State.SubsystemPermissionModel.list}
                            columns={SubsystemPermissionColumns}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
