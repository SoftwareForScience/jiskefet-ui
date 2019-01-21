/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { NamedAction } from '../types';
import { Reducer } from 'redux';

/**
 * A wrapper function for a reducer, enabling the reducer to only process actions that have the same name as
 * the reducer. This allows reuse of reducer logic across multiple instances of the reducer.
 *
 * Example: An action { type: 'SOME_TYPE', name: 'foo', payload: 'some payload' } will only be processed by the reducer
 * with the same name ('foo').
 *
 * @template S The state type.
 * @template N The naming type, e.g. a string enum or regular string.
 *
 * @param reducerFunction The reducer to wrap.
 * @param reducerName The name for the reducer.
 */
export const createNamedWrapperReducer = <S, N extends string>(reducerFunction: Reducer<S>, reducerName: N) => {
    return (state: S, action: NamedAction) => {
        const { name } = action;
        const isInitializationCall = state === undefined;
        if (name !== reducerName && !isInitializationCall) {
            return state;
        }
        return reducerFunction(state, action);
    };
};
