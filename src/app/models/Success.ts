/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

let successList: string[] = [];

const SuccessModel = {
    /**
     * Add success message to succes list.
     */
    add: (a: string): void => {
        successList.push(a);
    },
    /**
     * returns the success messages and removes them from the list.
     */
    getSuccessMessages: (): string[] => {
        const tempSuccesList: string[] = successList;
        successList = [];
        return tempSuccesList;
    }
};

type SuccessModel = typeof SuccessModel;
export default SuccessModel;
