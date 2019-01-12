import { Subsystem } from '../interfaces/SubSytem';
import { HttpError } from '../interfaces/HttpError';
import { request } from '../request';
import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// State interface
export interface SubsystemState {
    fetchingSubsystems: boolean;
    subsystems: Subsystem[];
    current: Subsystem | null;
}

// Action interfaces
interface FetchSubsystemsRequestAction extends Action {
    type: TypeKeys.FETCH_SUBSYSTEMS_REQUEST;
}

interface FetchSubsystemsSuccessAction extends Action {
    type: TypeKeys.FETCH_SUBSYSTEMS_SUCCESS;
    payload: Subsystem[];
}

// Combine actions into single type
export type SubsystemAction = FetchSubsystemsSuccessAction | FetchSubsystemsRequestAction;
type ThunkResult<R> = ThunkAction<R, SubsystemState, undefined, Action>;

// Initial state
const initialState: SubsystemState = {
    fetchingSubsystems: false,
    subsystems: [],
    current: null
};

// Action types
enum TypeKeys {
    FETCH_SUBSYSTEMS_REQUEST = 'FETCH_SUBSYSTEMS_REQUEST',
    FETCH_SUBSYSTEMS_SUCCESS = 'FETCH_SUBSYSTEMS_SUCCESS'
}

// Reducer
export const subsystemReducer = (state: SubsystemState = initialState, action: SubsystemAction): SubsystemState => {
    switch (action.type) {
        case TypeKeys.FETCH_SUBSYSTEMS_REQUEST:
            return {
                ...state,
                fetchingSubsystems: true
            };
        case TypeKeys.FETCH_SUBSYSTEMS_SUCCESS:
            return {
                ...state,
                fetchingSubsystems: false,
                subsystems: action.payload
            };
        default:
            return state;
    }
};

// Action creators
export const fetchSubsystems = (): ThunkResult<void> =>
    (dispatch: ThunkDispatch<SubsystemState, void, AnyAction>) => {
        dispatch<FetchSubsystemsRequestAction>({ type: TypeKeys.FETCH_SUBSYSTEMS_REQUEST });
        request({
            method: 'GET',
            url: `${process.env.API_URL}subsystems`,
            withCredentials: false
        }).then((result: Subsystem[]) => {
            dispatch<FetchSubsystemsSuccessAction>({
                    type: TypeKeys.FETCH_SUBSYSTEMS_SUCCESS,
                    payload: result
            });
        }).catch((error: HttpError) => {
            // State.HttpErrorModel.add(error);
        });
    };
