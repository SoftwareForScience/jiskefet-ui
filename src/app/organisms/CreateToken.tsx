/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { IEvent } from '../interfaces/Event';
import Table from '../molecules/Table';
import SubsystemPermissionColumns from '../constants/SubsystemPermissionColumns';
import SuccessMessage from '../atoms/SuccessMessage';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
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
import { ISubsystemPermissionCreate } from '../interfaces/SubsystemPermission';
import Spinner from '../atoms/Spinner';
import { fetchProfile } from '../redux/ducks/auth/operations';
import { selectProfile } from '../redux/ducks/auth/selectors';
import { fetchUser } from '../redux/ducks/user/operations';
import { UserProfile } from '../interfaces/UserProfile';
import Input from '../atoms/Input';
import FormGroup from '../molecules/FormGroup';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import Button, { ButtonType, ButtonClass } from '../atoms/Button';

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
        store.dispatch(createToken(tokenToCreate as ISubsystemPermissionCreate));
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
                                <p> For a machine to make use of the API,
                                    it needs to use an access token for
                                    authentication and authorization. This token can be
                                    generated here and is linked to your account.
                                </p>
                                <p>
                                    You will be held responsible for the machine's API calls.
                                </p>
                            </div>
                            <form
                                onsubmit={(event: IEvent) => {
                                    event.preventDefault();
                                    this.handleSubmit(event);
                                }}
                            >
                                <FormGroup
                                    label={(
                                        <Label autofocus="autofocus" id="description" text="Token description" />
                                    )}
                                    field={(
                                        <Input
                                            id="description"
                                            inputType="text"
                                            autofocus="autofocus"
                                            className="form-control"
                                            required={true}
                                        />
                                    )}
                                />
                                <FormGroup
                                    label={(
                                        <Label id="subsystem" text="Select subsystem:" />
                                    )}
                                    field={(
                                        <div>
                                            <Spinner
                                                isLoading={selectFetchingSubsystems(store.getState())}
                                                small
                                            >
                                                <Select
                                                    id="subsystem"
                                                    className="form-control"
                                                    name="subsystem"
                                                    required
                                                    hidden={subsystems.length === 0}
                                                    optionValue="subsystemId"
                                                    optionText="subsystemName"
                                                    options={subsystems}
                                                    defaultOption="Please select a subsystem."
                                                />
                                                {/* Below div could become an *alert* atom */}
                                                <div
                                                    class="alert alert-warning"
                                                    role="alert"
                                                    hidden={subsystems.length > 0}
                                                >No subsystems found,
                                                                            please add subsystems directly
                                                                            via SQL queries in the database.
                                                </div>
                                            </Spinner>
                                        </div>
                                    )}
                                />
                                <FormGroup
                                    field={(
                                        <Button
                                            buttonType={ButtonType.SUBMIT}
                                            buttonClass={ButtonClass.DEFAULT}
                                            disabled={subsystems.length === 0}
                                            text="Generate token"
                                        />
                                    )}
                                />
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
