/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * The columns used by the Table that holds Log entities.
 */
const SubsystemPermissionColumns: any[] = [
    {
        header: 'Subsystem permission id',
        accessor: 'subSystemPermissionId'
    },
    {
        header: 'Description',
        accessor: 'subSystemTokenDescription',
    }
];

type SubsystemPermissionColumns = typeof SubsystemPermissionColumns;
export default SubsystemPermissionColumns;
