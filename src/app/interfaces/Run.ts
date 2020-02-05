/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ILog } from './Log';

/**
 * Interface with the fields for fetching one or more Log entries.
 */
export interface IRun {
    runNumber: number;
    O2StartTime: Date | string;
    TrgStartTime: Date | string;
    TrgEndTime: Date | string;
    O2EndTime: Date | string;
    runType: string[];
    runQuality: string[];
    activityId: string;
    nDetectors: number;
    nFlps: number;
    nEpns: number;
    nTimeframes: number;
    nSubtimeframes: number;
    bytesReadOut: number;
    bytesTimeframeBuilder: number;
    logs: ILog[];
}
