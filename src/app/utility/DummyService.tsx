import * as m from 'mithril';
import { IColumn } from '../interfaces/Column';
import _ = require('lodash');
import Table from '../molecules/Table';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Creates a dummy table, to be used when fetching happens.
 */
export const createDummyTable = (size: number, columns: IColumn[], className?: string): JSX.Element => {
    const dummyData = [] as Array<{ [column: string]: any }>;
    _.times(size, () => dummyData.push({ key: 'value' }));
    return (
        <Table
            data={dummyData}
            columns={columns}
            className={className || ''}
        />
    );
};
