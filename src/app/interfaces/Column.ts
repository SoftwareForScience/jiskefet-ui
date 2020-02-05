/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * A column/table header for a table.
 */
export interface IColumn {
    /**
     * The column header name to be displayed in the table.
     */
    header: string;
    /**
     * The key to access the field in the data array given to the table.
     */
    accessor: string;
    /**
     * Optional custom rendering of each cell in the table for the column.
     */
    cell?: (row: object) => JSX.Element | string | number;
}
