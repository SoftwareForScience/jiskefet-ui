/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import reducer from './reducers';

import * as runSelectors from './selectors';
import * as runOperations from './operations';
import * as runTypes from './types';

/**
 * Exposes the public API for this duck.
 */

export {
    runSelectors,
    runOperations,
    runTypes
};

export default reducer;
