import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchRequestsData } from 'app/api/fetchRequestsData';

import {
    setRequestsData,
    triggerRequestsDataFetch
} from 'app/slices/requestSlice';

// /. imports

function* fetchRequestsWorker(): any {
    // business logic
    const { requestsData } = yield call(fetchRequestsData);
    yield put(setRequestsData(requestsData));
}

export function* fetchRequestsWatcher(): any {
    // watching for AC of slice
    yield takeEvery(triggerRequestsDataFetch.type, fetchRequestsWorker);
}
