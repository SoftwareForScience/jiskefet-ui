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

export const getSubsystems = (): string => `${baseUrl}subsystems`;
