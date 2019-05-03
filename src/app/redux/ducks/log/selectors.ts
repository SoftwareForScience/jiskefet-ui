/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { ILog, ILogCreate } from '../../../interfaces/Log';

// Selectors
export const selectIsFetchingLogs = (state: RootState): boolean => state.log.isFetchingLogs;
export const selectIsFetchingThread = (state: RootState): boolean => state.log.isFetchingThread;
export const selectIsFetchingLog = (state: RootState): boolean => state.log.isFetchingLog;
export const selectIsPatchingLinkRunToLog = (state: RootState): boolean => state.log.isPatchingLinkRunToLog;
export const selectLogs = (state: RootState): ILog[] => state.log.logs;
export const selectLogCount = (state: RootState): number => state.log.count;
export const selectThread = (state: RootState): ILog | null => state.log.thread;
export const selectCurrentLog = (state: RootState): ILog | null => (
    state.log.current
);
export const selectLogToBeCreated = (state: RootState): ILogCreate | null => (
    state.log.logToBeCreated
);
