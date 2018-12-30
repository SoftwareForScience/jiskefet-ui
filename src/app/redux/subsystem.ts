import { SubSystem } from '../interfaces/SubSytem';
import { HttpError } from '../interfaces/HttpError';
import { request } from '../request';
import { Dispatch } from 'redux';

interface SubsystemState {
    fetchingSubsystems: boolean;
    subsystems: SubSystem[];
    current: SubSystem | null;
}

const defaultState: SubsystemState = {
    fetchingSubsystems: false,
    subsystems: [],
    current: null
};

// action types
const FETCH_SUBSYSTEMS_REQUEST = 'FETCH_SUBSYSTEMS_REQUEST';
const FETCH_SUBSYSTEMS_SUCCESS = 'FETCH_SUBSYSTEMS_SUCCESS';

// reducer
export const subsystemReducer = (state: SubsystemState = defaultState, action: any) => {
    switch (action.type) {
        case FETCH_SUBSYSTEMS_REQUEST:
            return {
                ...state,
                fetchingSubsystems: true
            };
        case FETCH_SUBSYSTEMS_SUCCESS:
            return {
                ...state,
                fetchingSubsystems: false,
                subsystems: action.payload
            };
        default:
            return state;
    }
};

// action creators
export const fetchSubsystems = () => (dispatch: Dispatch) => {
    dispatch({ type: FETCH_SUBSYSTEMS_REQUEST });
    request({
        method: 'GET',
        url: `${process.env.API_URL}subsystems`,
        withCredentials: false
    }).then((result: SubSystem[]) => {
        dispatch({ type: FETCH_SUBSYSTEMS_SUCCESS, payload: result });
    }).catch((error: HttpError) => {
        // State.HttpErrorModel.add(error);
    });
};
