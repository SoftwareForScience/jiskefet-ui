/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

 /**
  * Interface for the API Response Object with a single item
  */
export interface ResponseObject<T> {
    apiVersion: string;
    meta?: Meta;
    data: {
        [key: string]: any;
        item: T;
    };
}

/**
 * Interface for the API Response Object with a collection of items
 */
export interface CollectionResponseObject<T> {
    apiVersion: string;
    meta?: Meta;
    data: {
        [key: string]: any;
        items: T[];
    };
}

/**
 * Interface for key value pair
 */
export interface Meta {
    [key: string]: string;
}
