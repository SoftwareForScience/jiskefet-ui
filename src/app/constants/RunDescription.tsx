/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 *
 * The tabs used by the Log details page.
 */

import * as m from 'mithril';
import { IDescription } from '../interfaces/Description';
import { IRun } from '../interfaces/Run';
import { formatDateField } from '../utility/DateUtil';

/**
 * The tab information used by the TabHeader and TabContent of the Log detail page.
 */
const RunDescription: IDescription[] = [
    {
        label: 'Run number',
        value: (run: IRun): number => {
            return run.runNumber;
        }
    },
    {
        label: 'Time O\xB2 start',
        value: (run: IRun): string | Date => {
            return formatDateField(run.O2StartTime);
        }
    },
    {
        label: 'Time O\xB2 end',
        value: (run: IRun): string | Date =>
            (run.O2EndTime ? formatDateField(run.O2EndTime) : 'Run In Progress')
    },
    {
        label: 'Time TRG start',
        value: (run: IRun): string | Date => {
            return formatDateField(run.TrgStartTime);
        }
    },
    {
        label: 'Time TRG end',
        value: (run: IRun): string | Date =>
            (run.TrgEndTime ? formatDateField(run.TrgEndTime) : 'Run In Progress')
    },
    {
        label: 'Run type',
        value: (run: IRun): string[] => {
            return run.runType;
        }
    },
    {
        label: 'Run quality',
        value: (run: IRun): JSX.Element => (
            <span class="badge badge-warning">
                {run.runQuality}
            </span>
        )
    },
    {
        label: 'Number of detectors',
        value: (run: IRun): number => {
            return run.nDetectors;
        }
    },
    {
        label: 'Number of FLP\'s',
        value: (run: IRun): number => {
            return run.nFlps;
        }
    },
    {
        label: 'Number of EPN\'s',
        value: (run: IRun): number => {
            return run.nEpns;
        }
    },
    {
        label: 'Number of timeframes',
        value: (run: IRun): number => {
            return run.nTimeframes;
        }
    },
    {
        label: 'Number of sub-timeframes',
        value: (run: IRun): number => {
            return run.nSubtimeframes;
        }
    },
    {
        label: 'Bytes read out',
        value: (run: IRun): number => {
            return run.bytesReadOut;
        }
    },
    {
        label: 'Bytes timeframe builder',
        value: (run: IRun): number => {
            return run.bytesTimeframeBuilder;
        }
    },
];

type RunDescription = typeof RunDescription;
export default RunDescription;
