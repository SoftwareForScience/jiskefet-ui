/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { format } from 'date-fns';

/**
 * Format a date field to a predefined format.
 * @param date date to be formatted.
 */
export const formatDateField = (date: string | Date): string => {
    return format(date, 'DD/MM/YYYY HH:mm:ss');
};
