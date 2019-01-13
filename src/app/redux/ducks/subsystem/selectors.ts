import { RootState } from '../../types';
import { Subsystem } from '../../../interfaces/SubSytem';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

// Selectors
export const selectSubsystems = (state: RootState): Subsystem[] => state.subsystem.subsystems;
