/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { User } from '../../../interfaces/User';
import { Log } from '../../../interfaces/Log';

// Selectors
export const selectUser = (state: RootState): User | null => state.user.user;
export const selectFetchingUser = (state: RootState): boolean => state.user.IsFetchingUser;
export const selectFetchingLogs = (state: RootState): boolean => state.user.IsFetchingLogs;
export const selectLogs = (state: RootState): Log[] => state.user.logs;
export const selectLogCount = (state: RootState): number => state.user.logCount;
export const selectCurrent = (state: RootState): User | null => state.user.current;
