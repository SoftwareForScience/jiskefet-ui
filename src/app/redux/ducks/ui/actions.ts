import { ToggleSidebarAction, ToggleCollapseAction, ActionTypes, SetCollapseAction, AddCollapseAction } from './types';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

// Action creators
export const toggleSidebar = (): ToggleSidebarAction => ({
    type: ActionTypes.TOGGLE_SIDEBAR
});

export const toggleCollapse = (id: string): ToggleCollapseAction => ({
    type: ActionTypes.TOGGLE_COLLAPSE,
    id
});

export const addCollapse = (id: string, isCollapsed: boolean): AddCollapseAction => ({
    type: ActionTypes.ADD_COLLAPSE,
    collapsableItem: { id, isCollapsed }
});

export const setCollapse = (id: string, isCollapsed: boolean): SetCollapseAction => ({
    type: ActionTypes.SET_COLLAPSE,
    collapsableItem: { id, isCollapsed }
});
