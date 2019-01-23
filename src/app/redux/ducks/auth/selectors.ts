/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { UserProfile } from '../../../interfaces/UserProfile';

// Selectors
export const selectIsFetchingProfile = (state: RootState): boolean => state.auth.isFetchingProfile;
export const selectProfile = (state: RootState): UserProfile | null => state.auth.profile;
export const selectIsAuthorizing = (state: RootState): boolean => state.auth.isAuthorizing;
export const selectToken = (state: RootState): string | null => state.auth.token;
