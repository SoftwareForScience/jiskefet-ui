import { ResponseObject } from './ResponseObject';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * An error received from, for example, a failed API call.
 * Returned in the catch portion of the Promise request().
 */
export interface HttpError<T> extends ResponseObject<T> {
    error: {
        error: string;
        code: number;
        message: string;
        details?: Array<HttpError<T>>;
        innerError?: InnerError;
    };
}

export interface InnerError {
    code: string;
    innerError: InnerError;
}
