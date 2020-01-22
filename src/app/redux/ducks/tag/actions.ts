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
    ClearTagToBeCreatedAction,
    FetchTagsByTagRequestAction,
    FetchTagsByTagSuccessAction,
    LinkTagToLogRequestAction,
    LinkTagToLogSuccessAction
} from './types';
import { ITag } from '../../../interfaces/Tag';
import { ICollectionSuccessObject } from '../../../interfaces/ResponseObject';

// Action creators
export const fetchTagsByLogRequest = (): FetchTagsByLogRequestAction => ({
    type: ActionTypes.FETCH_TAGS_BY_LOG_REQUEST
});

export const fetchTagsByLogSuccess = (
    payload: ICollectionSuccessObject<ITag>): FetchTagsByLogSuccessAction => ({
        type: ActionTypes.FETCH_TAGS_BY_LOG_SUCCESS,
        payload
    });

export const createTagRequest = (): CreateTagRequestAction => ({
    type: ActionTypes.CREATE_TAG_REQUEST
});

export const createTagSuccess = (): CreateTagSuccessAction => ({
    type: ActionTypes.CREATE_TAG_SUCCESS
});

export const setTagToBeCreated = (attachment: ITag): SetTagToBeCreatedAction => ({
    type: ActionTypes.SET_TAG_TO_BE_CREATED,
    payload: attachment
});

export const clearTagToBeCreated = (): ClearTagToBeCreatedAction => ({
    type: ActionTypes.CLEAR_TAG_TO_BE_CREATED
});

export const fetchTagsRequest = (): FetchTagsByTagRequestAction => ({
    type: ActionTypes.FETCH_TAGS_REQUEST
});

export const linkTagToLogRequest = (): LinkTagToLogRequestAction => ({
    type: ActionTypes.LINK_TAG_TO_LOG_REQUEST
});

export const linkTagToLogSuccess = (): LinkTagToLogSuccessAction => ({
    type: ActionTypes.LINK_TAG_TO_LOG_SUCCESS
});

export const fetchTagsSuccess = (payload: ICollectionSuccessObject<ITag>): FetchTagsByTagSuccessAction => ({
    type: ActionTypes.FETCH_TAGS_SUCCESS,
    payload
});
