/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * This file contains all the api calls.
 * Each call should be prefixed with an HTTP request method (e.g. get/post/put/patch/delete)
 */

const baseUrl = process.env.API_URL;

// Subsystem
export const getSubsystems = (): string => `${baseUrl}subsystems`;
export const getSubsystem = (id: string | number): string => `${baseUrl}subsystems/${id}`;
export const getSubsystemOverviews = (query?: string): string => `${baseUrl}overview${query ? `?${query}` : ''}`;
export const getSubsystemPermissions = (userId: number): string => `${baseUrl}users/${userId}/tokens`;
export const postToken = (userId: number): string => (`${baseUrl}users/${userId}/tokens`);

// Attachment
export const getAttachmentsByLog = (logId: number): string => `${baseUrl}attachments/${logId}/logs`;
export const postAttachment = (): string => `${baseUrl}attachments`;

// Auth
export const getProfile = (): string => `${baseUrl}user/profile`;
export const getAuthorize = (authGrant: string): string => `${process.env.API_URL}auth?grant=${authGrant}`;

// User
export const getUser = (id: string | number): string => `${baseUrl}users/${id}`;
export const getLogsForUser = (id: string | number, query?: string): string =>
    `${baseUrl}users/${id}/logs${query ? `?${query}` : ''}`;

// Run
export const getRuns = (query?: string): string => `${baseUrl}runs${query ? `?${query}` : ''}`;
export const getRun = (id: string | number): string => `${baseUrl}runs/${id}`;
export const linkLogToRunUrl = (runNumber: number): string => `${baseUrl}runs/${runNumber}/logs`;

// Log
export const getLogs = (query?: string): string => `${baseUrl}logs${query ? `?${query}` : ''}`;
export const getLog = (id: string | number): string => `${baseUrl}logs/${id}`;
export const linkRunToLogUrl = (runNumber: number): string => `${baseUrl}logs/${runNumber}/runs`;
export const postLog = (): string => `${baseUrl}logs`;
