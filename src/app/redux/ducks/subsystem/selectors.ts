import { RootState } from '../../types';
import { Subsystem } from '../../../interfaces/SubSytem';
import { SubsystemOverview } from '../../../interfaces/SubsystemOverview';
import { SubsystemPermission } from '../../../interfaces/SubsystemPermission';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

// Selectors
export const selectFetchingSubsystems = (state: RootState): boolean => state.subsystem.isFetchingSubsystems;
export const selectSubsystems = (state: RootState): Subsystem[] => state.subsystem.subsystems;
export const selectSubsystem = (state: RootState): Subsystem | null => state.subsystem.current;
export const selectSubsystemOverviews = (state: RootState): SubsystemOverview[] => state.subsystem.subsystemOverviews;
export const selectFetchingSubsystemOverviews = (state: RootState): boolean => (
    state.subsystem.isFetchingSubsystemOverviews
);
export const selectFetchingSubsystemPermissions = (state: RootState): boolean => (
    state.subsystem.isFetchingSubsystemPermissions
);
export const selectSubsystemPermissions = (state: RootState): SubsystemPermission[] => (
    state.subsystem.subsystemPermissions
);
