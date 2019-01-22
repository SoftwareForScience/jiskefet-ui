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
import { Subsystem } from '../interfaces/SubSytem';
import Table from '../components/Table';
import SubsystemPermissionColumns from '../constants/SubsystemPermissionColumns';
import SuccessMessage from '../components/SuccessMessage';
import HttpErrorAlert from '../components/HttpErrorAlert';
import { store } from '../redux/configureStore';
import {
    fetchSubsystems,
    fetchSubsystemPermissions,
    createToken
} from '../redux/ducks/subsystem/operations';
import {
    selectSubsystems,
    selectSubsystemPermissions,
    selectFetchingSubsystemPermissions,
    selectFetchingSubsystems
} from '../redux/ducks/subsystem/selectors';
import { SubsystemPermissionCreate } from '../interfaces/SubsystemPermission';
import Spinner from '../components/Spinner';
import { fetchProfile } from '../redux/ducks/auth/operations';
import { selectProfile } from '../redux/ducks/auth/selectors';
import { fetchUser } from '../redux/ducks/user/operations';
import { UserProfile } from '../interfaces/UserProfile';

export default class CreateToken extends MithrilTsxComponent<{}> {

    async oninit() {
        store.dispatch(fetchSubsystems());
        await store.dispatch(fetchProfile());
        const profile = selectProfile(store.getState());
        if (profile) {
            await store.dispatch(fetchUser(profile.userData.userId));
            const loggedInUserId = profile.userData.userId;
            store.dispatch(fetchSubsystemPermissions(loggedInUserId));
        }
    }

    async handleSubmit(event: any): Promise<void> {
        const profile = await selectProfile(store.getState()) as UserProfile;
        if (!profile) {
            store.dispatch(fetchProfile());
        }
        const subsystemId = event.target.subsystem.value;
        const tokenToCreate = {
            user: profile.userData.userId,
            subsystem: subsystemId,
            subSystemTokenDescription: event.target.description.value,
            isMember: true,
            editEorReason: true
        };
        store.dispatch(createToken(tokenToCreate as SubsystemPermissionCreate));
        event.target.reset(); // Clear the form.
    }

    view() {
        const subsystems = selectSubsystems(store.getState());
        return (
            <div class="container-fluid">
                <SuccessMessage />
                <HttpErrorAlert hideChildren>
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
                                                hidden={subsystems.length === 0}
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                    hidden
                                                >Please select a subsystem.
                                                </option>
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
                                            <div
                                                class="alert alert-warning"
                                                role="alert"
                                                hidden={subsystems.length > 0}
                                            >No subsystems found,
                                                    please add subsystems directly via SQL queries in the database.
                                            </div>
                                        </Spinner>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                        disabled={subsystems.length === 0}
                                    >Generate Token
                                    </button>
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
