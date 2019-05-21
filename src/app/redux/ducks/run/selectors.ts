/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { IRun } from '../../../interfaces/Run';

// Selectors
export const selectIsFetchingRuns = (state: RootState): boolean => state.run.isFetchingRuns;
export const selectIsFetchingRun = (state: RootState): boolean => state.run.isFetchingRun;
export const selectIsPatchingLinkLogToRun = (state: RootState): boolean => state.run.isPatchingLinkLogToRun;
export const selectRuns = (state: RootState): IRun[] => state.run.runs;
export const selectRunCount = (state: RootState): number => state.run.count;
export const selectCurrentRun = (state: RootState): IRun | null => (
    state.run.current
);
