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
import { Subsystem } from '../interfaces/SubSytem';
import Table from '../components/Table';
import SubsystemPermissionColumns from '../constants/SubsystemPermissionColumns';
import SuccessMessage from '../components/SuccessMessage';
import HttpErrorAlert from '../components/HttpErrorAlert';
import { store } from '../redux/configureStore';
import {
    fetchSubsystems,
    fetchSubsystemPermissions,
    fetchSubsystem,
    createToken
} from '../redux/ducks/subsystem/operations';
import {
    selectSubsystems,
    selectSubsystem,
    selectSubsystemPermissions,
    selectFetchingSubsystemPermissions,
    selectFetchingSubsystems
} from '../redux/ducks/subsystem/selectors';
import { SubsystemPermissionCreate } from '../interfaces/SubsystemPermission';
import Spinner from '../components/Spinner';

export default class CreateToken extends MithrilTsxComponent<{}> {
    async oninit() {
        store.dispatch(fetchSubsystems());
        await State.AuthModel.fetchProfile();
        if (State.AuthModel.profile !== null) {
            await State.UserModel.fetchById(State.AuthModel.profile.userData.userId);
            const loggedInUserId = State.AuthModel.profile.userData.userId;
            store.dispatch(fetchSubsystemPermissions(loggedInUserId));
        }
    }

    async handleSubmit(event: any): Promise<void> {
        let user = null;
        await State.AuthModel.fetchProfile();
        if (State.AuthModel.profile !== null) {
            await State.UserModel.fetchById(State.AuthModel.profile.userData.userId);
            user = State.UserModel.current;
            const loggedInUserId = State.AuthModel.profile.userData.userId;
            await store.dispatch(fetchSubsystemPermissions(loggedInUserId));
        }

        const subsystemId = event.target.subsystem.value;
        await store.dispatch(fetchSubsystem(subsystemId));

        const tokenToCreate = {
            user,
            subsystem: selectSubsystem(store.getState()),
            subSystemTokenDescription: event.target.description.value,
            isMember: true,
            editEorReason: true
        };

        store.dispatch(createToken(tokenToCreate as SubsystemPermissionCreate))
            .then(() => m.route.set('/ '));
    }

    view() {
        const subsystems = selectSubsystems(store.getState());
        return (
            <div class="container-fluid">
                <SuccessMessage />
                <HttpErrorAlert>
                    <div class="row">
                        <div class="col-9 mx-auto bg-light rounded p-4 shadow-sm">
                            <div><h2>Create a new token</h2></div>
                            <div>
                                <p> For a machine to make use of the jiskefet API,
                                    it needs to use an access token for
                                    authentication and authorization. This token can be
                                    generated here and is linked to your account.
                                </p>
                                <p>
                                    You will be held responsible for the machine's API calls.
                                </p>
                            </div>
                            <form
                                onsubmit={(event: Event) => {
                                    event.preventDefault();
                                    this.handleSubmit(event);
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
                                            // oninput={this.addDescription}
                                            required
                                        />
                                        <p class="note">What's the token for?</p>
                                    </dd>
                                </dl>
                                <div class="form-group">
                                    <dt>
                                        <label for="subsystem">Select subsystem:</label>
                                    </dt>
                                    <div class="field">
                                        <Spinner
                                            isLoading={selectFetchingSubsystems(store.getState())}
                                            small
                                        >
                                            <select
                                                id="subsystem"
                                                class="form-control"
                                                name="subsystem"
                                                required
                                                // onclick={this.addToCreateToken}
                                            >
                                                {
                                                    subsystems && subsystems.map((subsystem: Subsystem) => (
                                                        <option
                                                            value={subsystem.subsystemId}
                                                        >
                                                            {subsystem.subsystemName}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </Spinner>
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
                            <Spinner
                                isLoading={selectFetchingSubsystemPermissions(store.getState())}
                            >
                                <Table
                                    data={selectSubsystemPermissions(store.getState())}
                                    columns={SubsystemPermissionColumns}
                                />
                            </Spinner>
                        </div>
                    </div>
                </HttpErrorAlert>
            </div>
        );
    }
}
