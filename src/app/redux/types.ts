/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Store as ReduxStore } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SubsystemState, SubsystemAction } from './ducks/subsystem/types';
import { UIState, UIAction } from './ducks/ui/types';
import { AttachmentState, AttachmentAction } from './ducks/attachment/types';
import { AuthState, AuthAction } from './ducks/auth/types';

/**
 * Extend dispatch to allow thunks (functions) to be given to dispatch, instead of only objects.
 */
export interface Store<S> extends ReduxStore<S> {
    dispatch: ThunkDispatch<S, undefined, RootActions>;
}

/**
 * The definition of the Redux state/store of the entire Jiskefet app.
 */
export interface RootState {
    subsystem: SubsystemState;
    ui: UIState;
    attachment: AttachmentState;
    auth: AuthState;
}

/**
 * All possible actions in the app.
 */
export type RootActions =
    | SubsystemAction
    | UIAction
    | AttachmentAction
    | AuthAction;