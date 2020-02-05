/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../types';
import { ICollapsableItem } from '../../../interfaces/CollapsableItem';

// State interface
export interface UIState {
    isSidebarShown: boolean;
    collapsableItems: ICollapsableItem[];
}

// Action types
export enum ActionTypes {
    TOGGLE_SIDEBAR = 'jiskefet/ui/TOGGLE_SIDEBAR',
    TOGGLE_COLLAPSE = 'jiskefet/ui/TOGGLE_COLLAPSE',
    ADD_COLLAPSE = 'jiskefet/ui/ADD_COLLAPSE',
    SET_COLLAPSE = 'jiskefet/ui/SET_COLLAPSE'
}

// Action interfaces
export interface ToggleSidebarAction extends Action {
    type: ActionTypes.TOGGLE_SIDEBAR;
}

export interface ToggleCollapseAction extends Action {
    type: ActionTypes.TOGGLE_COLLAPSE;
    id: string;
}

export interface AddCollapseAction extends Action {
    type: ActionTypes.ADD_COLLAPSE;
    collapsableItem: ICollapsableItem;
}

export interface SetCollapseAction extends Action {
    type: ActionTypes.SET_COLLAPSE;
    collapsableItem: ICollapsableItem;
}

// Combine actions into single type
export type UIAction = ToggleSidebarAction | ToggleCollapseAction | AddCollapseAction | SetCollapseAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, UIAction>;
