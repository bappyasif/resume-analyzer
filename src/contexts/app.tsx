"use client"

import type { User } from "next-auth";
import React, { useMemo } from "react";
import type { ActionTypes, Resume } from "~/types";

interface AppState {
    resume: Resume;
    user: User | null;
}

const initialState: AppState = {
    resume: {
        parsedText: "",
        role: "",
        feedback: "",
        analysis: "",
    },
    user: null,
};

interface AppCtx {
    state: AppState;
    dispatch: (action: ActionTypes) => void;
}

const AppCtx = React.createContext<AppCtx>({
    state: initialState,
    dispatch: () => { },
});

type Reducer = (state: AppState, action: ActionTypes) => AppState;

const appCtxReducer: Reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_RESUME_PARSED_TEXT":
            console.log(action.payload, "action payload: parsed text")
            return {
                ...state,
                resume: {
                    ...state.resume,
                    parsedText: action.payload,
                },
            };
        case "UPDATE_RESUME_ROLE":
            return {
                ...state,
                resume: {
                    ...state.resume,
                    role: action.payload,
                },
            };
        case "UPDATE_RESUME_FEEDBACK":
            return {
                ...state,
                resume: {
                    ...state.resume,
                    feedback: action.payload,
                },
            };
        case "UPDATE_RESUME_ANALYSIS":
            return {
                ...state,
                resume: {
                    ...state.resume,
                    analysis: action.payload,
                },
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

const AppCtxProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(appCtxReducer, initialState);

    const memoizedValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

    return (
        <AppCtx.Provider
            value={memoizedValue}
        >
            {children}
        </AppCtx.Provider>
    );
};

export const useAppCtx = () => React.useContext(AppCtx);

export default AppCtxProvider;