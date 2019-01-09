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
import SuccessMessage from '../components/SuccessMessage';
import HttpErrorAlert from '../components/HttpErrorAlert';
import { store } from '../configureStore';
import { fetchSubsystems } from '../redux/subsystem';

export default class CreateToken extends MithrilTsxComponent<{}> {

    async oninit() {
        // State.SubsystemModel.fetch();
        store.dispatch(fetchSubsystems());
        await State.AuthModel.fetchProfile();
        if (State.AuthModel.profile !== null) {
            await State.UserModel.fetchById(State.AuthModel.profile.userData.userId);
            await State.SubsystemPermissionModel.fetch(State.UserModel.current.userId);
            State.SubsystemPermissionModel.createToken.user = State.UserModel.current;
        }
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
        State.SubsystemPermissionModel.save(State.SubsystemPermissionModel.createToken.user.userId)
            .then(() => {
                m.route.set('/ ');
            });
    }

    view() {
        console.log(store.getState());
        const { subsystemReducer } = store.getState();
        return (
            <div class="container-fluid">
                <SuccessMessage />
                <HttpErrorAlert>
                    <div class="row">
                        <div class="col-9 mx-auto bg-light rounded p-4 shadow-sm">
                            <div><h2>Create a new token</h2></div>
                            <div>
                                <p> For a machine to make use of jiskefet logging system,
                                    it needs to get an acces token needs to use an access token for
                                    authentication and authorization. This token needs to be
                                    generated and is then linked to the user's account.
                                    The user creating the token will be held responsible for the machine's API calls.

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
                                            {
                                                subsystemReducer.subsystems
                                                && subsystemReducer.subsystems.map((sub: SubSystem) => (
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
                                {/* <dl class="form-group">
                                <dt class="input-label">
                                    <label autofocus="autofocus">Select role</label>
                                </dt>
                                <dd>
                                    <p>What the subsystem is allowed to do.</p>
                                </dd>
                            </dl> */}
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
                </HttpErrorAlert>
            </div>
        );
    }
}
