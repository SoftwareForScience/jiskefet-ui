/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { UIState, UIAction, ActionTypes } from './types';
import { CollapsableItem } from '../../../interfaces/CollapsableItem';

// Initial state
const initialState: UIState = {
    isSidebarShown: true,
    collapsableItems: []
};

// Reducer
const uiReducer: Reducer<UIState>
    = (state: UIState = initialState, action: UIAction): UIState => {
        switch (action.type) {
            case ActionTypes.TOGGLE_SIDEBAR:
                return {
                    ...state,
                    isSidebarShown: !state.isSidebarShown
                };
            case ActionTypes.TOGGLE_COLLAPSE:
                return {
                    ...state,
                    collapsableItems: state.collapsableItems.map((item: CollapsableItem) => {
                        if (item.id === action.id) {
                            return {
                                id: action.id,
                                isCollapsed: !item.isCollapsed
                            };
                        }
                        return item;
                    })
                };
            case ActionTypes.ADD_COLLAPSE:
                if (state.collapsableItems.filter(
                    (item: CollapsableItem) => item.id === action.collapsableItem.id).length === 0
                ) {
                    return {
                        ...state,
                        collapsableItems: [
                            ...state.collapsableItems,
                            action.collapsableItem
                        ]
                    };
                }
                return state;
            case ActionTypes.SET_COLLAPSE:
                return {
                    ...state,
                    collapsableItems: state.collapsableItems.map((item: CollapsableItem) => {
                        if (item.id === action.collapsableItem.id) {
                            return {
                                id: action.collapsableItem.id,
                                isCollapsed: action.collapsableItem.isCollapsed
                            };
                        }
                        return item;
                    })
                };
            default:
                return state;
        }
    };

export default uiReducer;
