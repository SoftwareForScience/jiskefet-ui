/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { ICollapsableItem } from '../../../interfaces/CollapsableItem';

// Selectors
export const selectIsSidebarShown = (state: RootState): boolean => state.ui.isSidebarShown;
export const selectCollapsableItems = (state: RootState): ICollapsableItem[] => (
    state.ui.collapsableItems
);

export const selectCollapsableItem = (state: RootState, id: string): ICollapsableItem | null => {
    const foundItem = state.ui.collapsableItems.find((item: ICollapsableItem) => {
        return item.id === id;
    });
    return foundItem || null;
};
