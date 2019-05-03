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
import { ITag, ITagCreate } from '../../../interfaces/Tag';
import { ICollectionSuccessObject } from '../../../interfaces/ResponseObject';

// State interface
export interface TagState {
    isFetchingTags: boolean;
    isFetchingTag: boolean;
    isCreatingTag: boolean;
    tags: ITag[];
    tagToBeCreated: ITagCreate | null;
    tagsForRun: ITag[];
    tagsForLog: ITag[];
}

// Action types
export enum ActionTypes {
    FETCH_TAGS_BY_LOG_REQUEST = 'jiskefet/attachment/FETCH_TAGS_BY_LOG_REQUEST',
    FETCH_TAGS_BY_LOG_SUCCESS = 'jiskefet/attachment/FETCH_TAGS_BY_LOG_SUCCESS',
    CREATE_TAG_REQUEST = 'jiskefet/attachment/CREATE_TAG_REQUEST',
    CREATE_TAG_SUCCESS = 'jiskefet/attachment/CREATE_TAG_SUCCESS',
    SET_TAG_TO_BE_CREATED = 'jiskefet/attachment/SET_TAG_TO_BE_CREATED',
    CLEAR_TAG_TO_BE_CREATED = 'jiskefet/attachment/CLEAR_TAG_TO_BE_CREATED'
}

// Action interfaces
export interface FetchTagsByLogRequestAction extends Action {
    type: ActionTypes.FETCH_TAGS_BY_LOG_REQUEST;
}

export interface FetchTagsByLogSuccessAction extends Action {
    type: ActionTypes.FETCH_TAGS_BY_LOG_SUCCESS;
    payload: ICollectionSuccessObject<ITag>;
}

export interface CreateTagRequestAction extends Action {
    type: ActionTypes.CREATE_TAG_REQUEST;
}

export interface CreateTagSuccessAction extends Action {
    type: ActionTypes.CREATE_TAG_SUCCESS;
}

export interface SetTagToBeCreatedAction extends Action {
    type: ActionTypes.SET_TAG_TO_BE_CREATED;
    payload: ITag;
}

export interface ClearTagToBeCreatedAction extends Action {
    type: ActionTypes.CLEAR_TAG_TO_BE_CREATED;
}

// Combine actions into single type
export type TagAction =
    | FetchTagsByLogRequestAction
    | FetchTagsByLogSuccessAction
    | CreateTagRequestAction
    | CreateTagSuccessAction
    | SetTagToBeCreatedAction
    | ClearTagToBeCreatedAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, TagAction>;
