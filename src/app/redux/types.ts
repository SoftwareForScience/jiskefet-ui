/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Store as ReduxStore, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SubsystemState, SubsystemAction } from './ducks/subsystem/types';
import { UIState, UIAction } from './ducks/ui/types';
import { AttachmentState, AttachmentAction } from './ducks/attachment/types';
import { AuthState, AuthAction } from './ducks/auth/types';
import { FilterAction, RootFilterState } from './ducks/filter/types';
import { ErrorState, ErrorAction } from './ducks/error/types';
import { UserState, UserAction } from './ducks/user/types';
import { RunState, RunAction } from './ducks/run/types';
import { LogState, LogAction } from './ducks/log/types';
import { SuccessState, SuccessAction } from './ducks/success/types';
import { TagState, TagAction } from './ducks/tag/types';

/**
 * Interface for the Redux store.
 * It extends dispatch to allow thunks (functions) to be given to dispatch, instead of only objects.
 */
export interface Store<S> extends ReduxStore<S> {
    dispatch: ThunkDispatch<S, undefined, RootActions>;
}

/**
 * The definition of the Redux state/store of the entire Jiskefet app.
 */
export interface RootState {
    log: LogState;
    run: RunState;
    subsystem: SubsystemState;
    success: SuccessState;
    ui: UIState;
    attachment: AttachmentState;
    auth: AuthState;
    filter: RootFilterState;
    error: ErrorState;
    user: UserState;
    tag: TagState;
}

/**
 * All possible actions in the app.
 */
export type RootActions =
    | SubsystemAction
    | SuccessAction
    | UIAction
    | AttachmentAction
    | AuthAction
    | FilterAction
    | ErrorAction
    | UserAction
    | RunAction
    | LogAction
    | TagAction;

/**
 * An action that has a name field to identify which reducer should process the action.
 */
export interface NamedAction extends Action {
    name: string;
}
