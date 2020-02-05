/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { BASE_URL } from './constants';

/**
 * This file contains all the api calls.
 * Each call should be prefixed with an HTTP request method (e.g. get/post/put/patch/delete)
 */

// Subsystem
export const getSubsystems = (): string => `${BASE_URL}subsystems`;
export const getSubsystem = (id: string | number): string => `${BASE_URL}subsystems/${id}`;
export const getSubsystemOverviews = (query?: string): string => `${BASE_URL}overview${query ? `?${query}` : ''}`;
export const getSubsystemPermissions = (userId: number): string => `${BASE_URL}users/${userId}/tokens`;
export const postToken = (userId: number): string => (`${BASE_URL}users/${userId}/tokens`);

// Attachment
export const getAttachmentsByLog = (logId: number): string => `${BASE_URL}attachments/${logId}/logs`;

// Auth
export const getProfile = (): string => `${BASE_URL}user/profile`;
export const getAuthorize = (authGrant: string): string => `${process.env.API_URL}auth?grant=${authGrant}`;

// User
export const getUser = (id: string | number): string => `${BASE_URL}users/${id}`;
export const getLogsForUser = (id: string | number, query?: string): string =>
    `${BASE_URL}users/${id}/logs${query ? `?${query}` : ''}`;

// Run
export const getRuns = (query?: string): string => `${BASE_URL}runs${query ? `?${query}` : ''}`;
export const getRun = (id: string | number): string => `${BASE_URL}runs/${id}`;
export const linkLogToRunUrl = (runNumber: number): string => `${BASE_URL}runs/${runNumber}/logs`;

// Log
export const getLogs = (query?: string): string => `${BASE_URL}logs${query ? `?${query}` : ''}`;
export const getLog = (id: string | number): string => `${BASE_URL}logs/${id}`;
export const linkRunToLogUrl = (runNumber: number): string => `${BASE_URL}logs/${runNumber}/runs`;
export const postLog = (): string => `${BASE_URL}logs`;
export const postAttachment = (logId: string | number): string => `${BASE_URL}logs/${logId}/attachments`;

// Tag
export const getTags = (): string => `${BASE_URL}tags`;
export const getTag = (id: string | number): string => `${BASE_URL}tags/${id}`;
export const getTagsForLog = (logId: string | number): string => `${BASE_URL}tags/${logId}/logs`;
export const getTagsForRun = (runId: string | number): string => `${BASE_URL}tags/${runId}/runs`;
export const postTag = (): string => `${BASE_URL}tags`;
export const updateTag = (id: string | number): string => `${BASE_URL}tags/${id}`;
export const deleteTage = (id: string | number): string => `${BASE_URL}tags/${id}`;
