import { SubsystemPermissionCreate } from '../interfaces/SubsystemPermission';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * This file contains all the api calls.
 */

const baseUrl = process.env.API_URL;

// Subsystem
export const getSubsystems = (): string => `${baseUrl}subsystems`;
export const getSubsystem = (id: string | number): string => `${baseUrl}subsystems/${id}`;
export const getSubsystemOverviews = (query?: string): string => `${baseUrl}overview${query ? `?${query}` : ''}`;
export const getSubsystemPermissions = (userId: number): string => `${baseUrl}users/${userId}/tokens`;
export const postToken = (payload: SubsystemPermissionCreate): string => (
    `${baseUrl}users/${payload.user.userId}/tokens/new`
);
