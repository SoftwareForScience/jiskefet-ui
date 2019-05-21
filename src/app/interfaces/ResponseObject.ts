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
export interface IResponseObject<T> {
    apiVersion: string;
    meta?: IMeta;
}

/**
 * Interface to standardize the response of a API object containing a single item
 */
export interface ISuccessObject<T> extends IResponseObject<T> {
    data: {
        [key: string]: any;
        item: T;
    };
}

/**
 * Interface to standardize the response of a API object containing multiple items
 */
export interface ICollectionSuccessObject<T> extends IResponseObject<T> {
    data: {
        [key: string]: any;
        items: T[];
    };
}
/**
 * Interface for Meta object
 */
export interface IMeta {
    [key: string]: string;
}
