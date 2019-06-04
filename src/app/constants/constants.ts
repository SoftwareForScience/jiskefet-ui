/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

 /**
  * This file holds all the constant variables
  */
export const BASE_URL = process.env.API_URL;
export const APPLICATION_NAME = process.env.APPLICATION_NAME ? process.env.APPLICATION_NAME : 'Jiskefet';
export let FILE_UPLOAD_LIMIT: number;
export let API_VERSION: string;

const fileUploadLimit = localStorage.getItem('FILE_UPLOAD_LIMIT');
if (fileUploadLimit) {
    FILE_UPLOAD_LIMIT = +fileUploadLimit;
} else {
    FILE_UPLOAD_LIMIT = process.env.FILE_UPLOAD_LIMIT ? +process.env.FILE_UPLOAD_LIMIT : 5;
}

const apiVersion = localStorage.getItem('API_VERSION');
if (apiVersion) {
    API_VERSION = apiVersion;
} else {
    API_VERSION = process.env.API_VERSION ? process.env.API_VERSION : '1.0.0';
}
