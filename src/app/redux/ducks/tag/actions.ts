/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import {
    FetchTagsByLogRequestAction,
    ActionTypes,
    FetchTagsByLogSuccessAction,
    CreateTagRequestAction,
    CreateTagSuccessAction,
    SetTagToBeCreatedAction,
    ClearTagToBeCreatedAction
} from './types';
import { Tag } from '../../../interfaces/Tag';
import { CollectionSuccessObject } from '../../../interfaces/ResponseObject';

// Action creators
export const fetchTagsByLogRequest = (): FetchTagsByLogRequestAction => ({
    type: ActionTypes.FETCH_TAGS_BY_LOG_REQUEST
});

export const fetchTagsByLogSuccess = (
    payload: CollectionSuccessObject<Tag>): FetchTagsByLogSuccessAction => ({
        type: ActionTypes.FETCH_TAGS_BY_LOG_SUCCESS,
        payload
    });

export const createTagRequest = (): CreateTagRequestAction => ({
    type: ActionTypes.CREATE_TAG_REQUEST
});

export const createTagSuccess = (): CreateTagSuccessAction => ({
    type: ActionTypes.CREATE_TAG_SUCCESS
});

export const setTagToBeCreated = (attachment: Tag): SetTagToBeCreatedAction => ({
    type: ActionTypes.SET_TAG_TO_BE_CREATED,
    payload: attachment
});

export const clearTagToBeCreated = (): ClearTagToBeCreatedAction => ({
    type: ActionTypes.CLEAR_TAG_TO_BE_CREATED
});
