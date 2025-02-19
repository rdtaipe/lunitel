import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";

const setState = (state, action) => {

    // console.log("setter function",state, action.payload);

    const { keys, value, only } = action.payload;



    if (!keys) return state;

    const recursiveUpdate = (obj, path, newValue, onlyFlag) => {
        const [currentKey, ...remainingPath] = path.split('.');

        if (!remainingPath.length) {
            return { ...obj, [currentKey]: newValue };
        }

        const currentValue = obj[currentKey];

        if (Array.isArray(currentValue)) {
            const itemId = remainingPath[0];
            const itemIndex = currentValue.findIndex(item => item.id === itemId);
            if (itemIndex === -1) return obj;

            const updatedItem = remainingPath.length === 1
                ? onlyFlag
                    ? { ...currentValue[itemIndex], [Object.keys(newValue)[0]]: Object.values(newValue)[0] }
                    : { ...currentValue[itemIndex], ...newValue }
                : recursiveUpdate(currentValue[itemIndex], remainingPath.slice(1).join('.'), newValue, onlyFlag);

            return {
                ...obj,
                [currentKey]: [
                    ...currentValue.slice(0, itemIndex),
                    updatedItem,
                    ...currentValue.slice(itemIndex + 1)
                ]
            };
        }

        if (currentValue && typeof currentValue === 'object') {
            return {
                ...obj,
                [currentKey]: recursiveUpdate(currentValue, remainingPath.join('.'), newValue, onlyFlag)
            };
        }

        return obj;
    };

    const updatedState = keys.includes('.')
        ? recursiveUpdate({ ...state }, keys, value, only)
        : { ...state, [keys]: value };

    return {
        ...state,
        ...updatedState,
        refresh: performance.now() // Integración de performance.now()
    };
}

const ReduxInitializer = ({ actions, children }) => {
    const dispatch = useDispatch();
    dispatch(actions.setter({ keys: "actions", value: actions }));
    return children;
};

const createReduxStore = ({ initialState, actions, children }) => {
    const Slice = createSlice({
        name: "state",
        initialState,
        reducers: { ...actions, setter: setState },
    });

    const store = configureStore({
        reducer: Slice.reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    });

    return (
        <Provider store={store}>
            <ReduxInitializer actions={Slice.actions}>
                {children}
            </ReduxInitializer>
        </Provider>
    );
};

export default createReduxStore;



