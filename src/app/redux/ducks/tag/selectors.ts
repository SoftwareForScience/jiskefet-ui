/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { Tag, TagCreate } from '../../../interfaces/Tag';

// Selectors
export const selectTags = (state: RootState): Tag[] => state.tag.tags;
export const selectTagsForRun = (state: RootState): Tag[] => state.tag.tagsForRun;
export const selectTagsForLog = (state: RootState): Tag[] => state.tag.tagsForLog;
export const selectTagToBeCreated = (state: RootState): TagCreate | null => state.tag.tagToBeCreated;
export const selectFetchingTags = (state: RootState): boolean => state.tag.isFetchingTags;
