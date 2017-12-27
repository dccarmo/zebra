import { Action } from 'redux';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { isType } from 'typescript-fsa';
import uuidv4 from 'uuid/v4';

import { createReminderAction, deleteReminderAction } from '../actions/index';
import Boleto, { getBarcodeDueDate } from '../models/Boleto';
import { getBoletoForReminder } from '../reducers/boletosReducer';

export function* createReminderSaga(action: Action) {
    if (isType(action, createReminderAction.started)) {
        const dueDate: Date | null = yield call(
            getBarcodeDueDate,
            action.payload.barcode,
        );

        const id: string = yield call(uuidv4);

        yield put(
            createReminderAction.done({
                params: action.payload,
                result: {
                    dueDate,
                    id,
                },
            }),
        );
    }
}

export function* watchCreateReminder() {
    yield takeEvery(createReminderAction.started, createReminderSaga);
}

export function* deleteReminderSaga(action: Action) {
    if (isType(action, deleteReminderAction.started)) {
        const boleto: Boleto = yield select(
            getBoletoForReminder,
            action.payload.id,
        );

        yield put(
            deleteReminderAction.done({
                params: action.payload,
                result: {
                    barcode: boleto.barcode,
                },
            }),
        );
    }
}

export function* watchDeleteReminder() {
    yield takeEvery(deleteReminderAction.started, deleteReminderSaga);
}

export default function* reminderSagas() {
    yield all([watchCreateReminder(), watchDeleteReminder()]);
}
