/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { ITag, ITagCreate } from '../../../interfaces/Tag';

// Selectors
export const selectTags = (state: RootState): ITag[] => state.tag.tags;
export const selectTagsForRun = (state: RootState): ITag[] => state.tag.tagsForRun;
export const selectTagsForLog = (state: RootState): ITag[] => state.tag.tagsForLog;
export const selectTagToBeCreated = (state: RootState): ITagCreate | null => state.tag.tagToBeCreated;
export const selectFetchingTags = (state: RootState): boolean => state.tag.isFetchingTags;
