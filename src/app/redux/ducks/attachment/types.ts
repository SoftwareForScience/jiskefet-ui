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
import { IAttachment, IAttachmentCreate } from '../../../interfaces/Attachment';
import { ICollectionSuccessObject } from '../../../interfaces/ResponseObject';

// State interface
export interface AttachmentState {
    isFetchingAttachments: boolean;
    isFetchingAttachment: boolean;
    isCreatingAttachment: boolean;
    attachments: IAttachment[];
    attachmentToBeCreated: IAttachmentCreate | null;
}

// Action types
export enum ActionTypes {
    FETCH_ATTACHMENTS_BY_LOG_REQUEST = 'jiskefet/attachment/FETCH_ATTACHMENTS_BY_LOG_REQUEST',
    FETCH_ATTACHMENTS_BY_LOG_SUCCESS = 'jiskefet/attachment/FETCH_ATTACHMENTS_BY_LOG_SUCCESS',
    CREATE_ATTACHMENT_REQUEST = 'jiskefet/attachment/CREATE_ATTACHMENT_REQUEST',
    CREATE_ATTACHMENT_SUCCESS = 'jiskefet/attachment/CREATE_ATTACHMENT_SUCCESS',
    SET_ATTACHMENT_TO_BE_CREATED = 'jiskefet/attachment/SET_ATTACHMENT_TO_BE_CREATED',
    CLEAR_ATTACHMENT_TO_BE_CREATED = 'jiskefet/attachment/CLEAR_ATTACHMENT_TO_BE_CREATED'
}

// Action interfaces
export interface FetchAttachmentsByLogRequestAction extends Action {
    type: ActionTypes.FETCH_ATTACHMENTS_BY_LOG_REQUEST;
}

export interface FetchAttachmentsByLogSuccessAction extends Action {
    type: ActionTypes.FETCH_ATTACHMENTS_BY_LOG_SUCCESS;
    payload: ICollectionSuccessObject<IAttachment>;
}

export interface CreateAttachmentRequestAction extends Action {
    type: ActionTypes.CREATE_ATTACHMENT_REQUEST;
}

export interface CreateAttachmentSuccessAction extends Action {
    type: ActionTypes.CREATE_ATTACHMENT_SUCCESS;
}

export interface SetAttachmentToBeCreatedAction extends Action {
    type: ActionTypes.SET_ATTACHMENT_TO_BE_CREATED;
    payload: IAttachmentCreate;
}

export interface ClearAttachmentToBeCreatedAction extends Action {
    type: ActionTypes.CLEAR_ATTACHMENT_TO_BE_CREATED;
}

// Combine actions into single type
export type AttachmentAction =
    | FetchAttachmentsByLogRequestAction
    | FetchAttachmentsByLogSuccessAction
    | CreateAttachmentRequestAction
    | CreateAttachmentSuccessAction
    | SetAttachmentToBeCreatedAction
    | ClearAttachmentToBeCreatedAction;

// Shorthand type for ThunkAction
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, AttachmentAction>;
