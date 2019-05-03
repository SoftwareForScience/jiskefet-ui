/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * An item that has a collapsable state.
 */
export interface ICollapsableItem {
    /**
     * The unique id of the item.
     */
    id: string;
    /**
     * Whether the item is currently collapsed.
     */
    isCollapsed: boolean;
}
