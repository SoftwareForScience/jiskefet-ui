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
import { ILog } from '../interfaces/Log';
import { formatDateField } from '../utility/DateUtil';

/**
 * The tab information used by the TabHeader and TabContent of the Log detail page.
 */
const LogDescription: IDescription[] = [
    {
        label: 'Log id',
        value: (log: ILog): number => {
            return log.logId;
        }
    },
    {
        label: 'Subtype',
        value: (log: ILog): JSX.Element => (
            <span
                class={`badge ${
                    log.subtype === 'run' ?
                        'badge-warning' :
                        'badge-primary'
                    }`}
            >
                {log.subtype}
            </span>
        )
    },
    {
        label: 'Origin',
        value: (log: ILog): JSX.Element => (
            <span
                class={`badge ${
                    log.origin === 'human' ?
                        'badge-success' :
                        'badge-primary'}`}
            >
                {log.origin}
            </span>
        )
    },
    {
        label: 'Creation time',
        value: (log: ILog): string => {
            return formatDateField(log.creationTime);
        }
    },
    {
        label: 'Author',
        value: (log: ILog): string => {
            return log.user &&
                log.user.name;
        }
    }
];

type LogDescription = typeof LogDescription;
export default LogDescription;
