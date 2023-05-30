import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

import { IrequestSlice, Irequest } from 'types/requestSliceTypes';

// /. imports

const initialState: IrequestSlice = {
    requests: [],
    // (lat)itude + (long)itude
    currentRoutesData: [
        {
            id: 1,
            role: 'start',
            label: 'Start Location Name',
            coords: {
                lat: 0,
                lng: 0
            }
        },
        {
            id: 2,
            role: 'end',
            label: 'End Location Name',
            coords: {
                lat: 0,
                lng: 0
            }
        }
    ],
    currentRequestKey: [],
    isRequestsDataLoading: true,
    requestsFetchError: null,
    isCoordsDataEmpty: true,
    isTableDataLoading: true
};

// /. state

const requestSlice = createSlice({
    name: 'requestSlice',
    initialState,
    reducers: {
        switchReqLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isRequestsDataLoading = action.payload;
        },
        setRequestsData(state, action: PayloadAction<Irequest[]>) {
            state.requests = action.payload;
        },
        setReqError(state, action: PayloadAction<null | string>) {
            state.requestsFetchError = action.payload;
        },
        setCurrentRouteCoords(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            // /. payload
            const targetAPIRoute = state.requests.find(
                route => route.id === id
            );
            const targetStartRoute = state.currentRoutesData.find(
                route => route.role === 'start'
            );
            const targetEndRoute = state.currentRoutesData.find(
                route => route.role === 'end'
            );
            if (targetAPIRoute && targetStartRoute && targetEndRoute) {
                targetStartRoute.coords.lat = targetAPIRoute.coords.lat_start;
                targetStartRoute.coords.lng = targetAPIRoute.coords.lng_start;
                //
                targetEndRoute.coords.lat = targetAPIRoute.coords.lat_end;
                targetEndRoute.coords.lng = targetAPIRoute.coords.lng_end;
            }
        },
        setCurrentRequestKey(state, action: PayloadAction<string[]>) {
            state.currentRequestKey = action.payload;
        },
        setCoordsDataEmptyStatus(state, action: PayloadAction<boolean>) {
            state.isCoordsDataEmpty = action.payload;
        },
        switchTableDataLoadingStatus(state, action: PayloadAction<boolean>) {
            state.isTableDataLoading = action.payload;
        },
        triggerRequestsDataFetch() {
            return;
        }
    }
});

export const {
    setRequestsData,
    switchReqLoadingStatus,
    setReqError,
    setCurrentRouteCoords,
    triggerRequestsDataFetch,
    setCoordsDataEmptyStatus,
    setCurrentRequestKey,
    switchTableDataLoadingStatus
} = requestSlice.actions;

export default requestSlice.reducer;
