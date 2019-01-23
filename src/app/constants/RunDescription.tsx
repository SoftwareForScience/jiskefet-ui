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
import { Description } from '../interfaces/Description';
import { Run } from '../interfaces/Run';
import { formatDateField } from '../utility/DateUtil';

/**
 * The tab information used by the TabHeader and TabContent of the Log detail page.
 */
const RunDescription: Description[] = [
    {
        label: 'Run number',
        value: (run: Run): number => {
            return run.runNumber;
        }
    },
    {
        label: 'Time O&sup2; start',
        value: (run: Run): string | Date => {
            return formatDateField(run.timeO2Start);
        }
    },
    {
        label: 'Time O&sup2; end',
        value: (run: Run): string | Date => {
            return formatDateField(run.timeO2Start);
        }
    },
    {
        label: 'Time TRG start',
        value: (run: Run): string | Date => {
            return formatDateField(run.timeO2Start);
        }
    },
    {
        label: 'Time TRG end',
        value: (run: Run): string | Date => {
            return formatDateField(run.timeO2Start);
        }
    },
    {
        label: 'Run type',
        value: (run: Run): string[] => {
            return run.runType;
        }
    },
    {
        label: 'Run quality',
        value: (run: Run): JSX.Element => (
            <span class="badge badge-warning">
                {run.runQuality}
            </span>
        )
    },
    {
        label: 'Number of detectors',
        value: (run: Run): number => {
            return run.nDetectors;
        }
    },
    {
        label: 'Number of FLP\'s',
        value: (run: Run): number => {
            return run.nFlps;
        }
    },
    {
        label: 'Number of EPN\'s',
        value: (run: Run): number => {
            return run.nEpns;
        }
    },
    {
        label: 'Number of timeframes',
        value: (run: Run): number => {
            return run.nTimeframes;
        }
    },
    {
        label: 'Number of sub-timeframes',
        value: (run: Run): number => {
            return run.nSubtimeframes;
        }
    },
    {
        label: 'Bytes read out',
        value: (run: Run): number => {
            return run.bytesReadOut;
        }
    },
    {
        label: 'Bytes timeframe builder',
        value: (run: Run): number => {
            return run.bytesTimeframeBuilder;
        }
    },
];

type RunDescription = typeof RunDescription;
export default RunDescription;
