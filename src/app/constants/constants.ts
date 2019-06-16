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
export const PAGE_SIZES = [10, 20, 30, 40, 50, 100, 200, 300, 400, 500];

/**
 * Retrieves the value that has been saved on index {key}.
 * This has been done to equalize the variables between the UI and the API
 * If the key does not exist, fall back to the .env or default value.
 */
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
