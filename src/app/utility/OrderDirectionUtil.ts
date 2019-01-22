/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { OrderDirection } from '../enums/OrderDirection';

/**
 * Returns the next OrderDirection or null, based on the argument given.
 * @param direction The order direction to cycle (can also be null, i.e. no direction).
 */
export const cycleOrderDirection = (direction: OrderDirection | null): OrderDirection | null => {
    switch (direction) {
        case null:
            return OrderDirection.Ascending;
        case OrderDirection.Ascending:
            return OrderDirection.Descending;
        case OrderDirection.Descending:
            return null;
        default:
            return null;
    }
};
