/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { IHttpError } from '../../../interfaces/HttpError';

// Selectors
export const selectErrors = (state: RootState): Array<IHttpError<any>> => state.error.httpErrors;
