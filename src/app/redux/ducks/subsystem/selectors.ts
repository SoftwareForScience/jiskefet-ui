/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { ISubsystem } from '../../../interfaces/SubSytem';
import { ISubsystemOverview } from '../../../interfaces/SubsystemOverview';
import { ISubsystemPermission } from '../../../interfaces/SubsystemPermission';

// Selectors
export const selectFetchingSubsystems = (state: RootState): boolean => state.subsystem.isFetchingSubsystems;
export const selectSubsystems = (state: RootState): ISubsystem[] => state.subsystem.subsystems;
export const selectSubsystem = (state: RootState): ISubsystem | null => state.subsystem.current;
export const selectSubsystemOverviews = (state: RootState): ISubsystemOverview[] => state.subsystem.subsystemOverviews;
export const selectFetchingSubsystemOverviews = (state: RootState): boolean => (
    state.subsystem.isFetchingSubsystemOverviews
);
export const selectFetchingSubsystemPermissions = (state: RootState): boolean => (
    state.subsystem.isFetchingSubsystemPermissions
);
export const selectSubsystemPermissions = (state: RootState): ISubsystemPermission[] => (
    state.subsystem.subsystemPermissions
);
