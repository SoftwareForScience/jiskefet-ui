/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { TagState, TagAction, ActionTypes } from './types';

// Initial state
const initialState: TagState = {
    isFetchingTags: false,
    isFetchingTag: false,
    isCreatingTag: false,
    tags: [],
    tagToBeCreated: null,
    tagsForLog: [],
    tagsForRun: []
};

// Reducer
const attachmentReducer: Reducer<TagState>
    = (state: TagState = initialState, action: TagAction): TagState => {
        switch (action.type) {
            case ActionTypes.FETCH_TAGS_BY_LOG_REQUEST:
                return {
                    ...state,
                    isFetchingTags: true
                };
            case ActionTypes.FETCH_TAGS_BY_LOG_SUCCESS:
                return {
                    ...state,
                    isFetchingTags: false,
                    tags: [...action.payload.data.items]
                };
            case ActionTypes.CREATE_TAG_REQUEST:
                return {
                    ...state,
                    isCreatingTag: true
                };
            case ActionTypes.CREATE_TAG_SUCCESS:
                return {
                    ...state,
                    isCreatingTag: false
                };
            case ActionTypes.SET_TAG_TO_BE_CREATED:
                return {
                    ...state,
                    tagToBeCreated: action.payload
                };
            case ActionTypes.CLEAR_TAG_TO_BE_CREATED:
                return {
                    ...state,
                    tagToBeCreated: null
                };
            default:
                return state;
        }
    };

export default attachmentReducer;
