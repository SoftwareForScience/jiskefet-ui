/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { IAttachment, IAttachmentCreate } from '../../../interfaces/Attachment';

// Selectors
export const selectAttachments = (state: RootState): IAttachment[] => state.attachment.attachments;
export const selectAttachmentToBeCreated = (state: RootState): IAttachmentCreate | null => (
    state.attachment.attachmentToBeCreated
);
