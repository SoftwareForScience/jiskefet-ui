// /*
//  * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
//  *
//  * This software is distributed under the terms of the
//  * GNU General Public Licence version 3 (GPL) version 3,
//  * copied verbatim in the file "LICENSE"
//  */

// import { HttpError } from '../interfaces/HttpError';

// /**
//  * This module stores http errors from failed api calls.
//  */

// /**
//  * Contains a list of http errors from failed api calls.
//  * Should not be modified directly, instead use the 'add' function inside HttpErrorModel.
//  */
// let errorList: HttpError[] = [];

// const HttpErrorModel = {
//     /**
//      * Add an error to the list
//      */
//     add: (a: HttpError): void => {
//         errorList.push(a);
//     },
//     /**
//      * Returns the list of errors and empties it.
//      */
//     getErrors: (): HttpError[] => {
//         const tempErrorList: HttpError[] = errorList;
//         errorList = [];
//         return tempErrorList;
//     }
// };

// type HttpErrorModel = typeof HttpErrorModel;
// export default HttpErrorModel;
