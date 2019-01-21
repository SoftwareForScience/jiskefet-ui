/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import subsystemReducer from './reducers';

import * as successSelectors from './selectors';
import * as successOperations from './operations';
import * as successTypes from './types';

/**
 * Exposes the public API for this duck.
 */

export {
    successSelectors,
    successOperations,
    successTypes
};

export default subsystemReducer;
