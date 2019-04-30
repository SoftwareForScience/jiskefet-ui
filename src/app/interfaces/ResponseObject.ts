/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Interface of information for every API response
 */
export interface ResponseObject<T> {
    apiVersion: string;
    meta?: Meta;
}

/**
 * Interface to standardize the response of a API object containing a single item
 */
export interface SuccessObject<T> extends ResponseObject<T> {
    data: {
        [key: string]: any;
        item: T;
    };
}

/**
 * Interface to standardize the response of a API object containing multiple items
 */
export interface CollectionSuccessObject<T> extends ResponseObject<T> {
    data: {
        [key: string]: any;
        items: T[];
    };
}
/**
 * Interface for Meta object
 */
export interface Meta {
    [key: string]: string;
}
