import PushNotification from 'react-native-push-notification';
import { Action } from 'redux';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { isType } from 'typescript-fsa';

import { addHours, startOfDay } from 'date-fns';
import { createReminderAction, deleteReminderAction } from '../actions/index';
import I18n from '../constants/i18n';
import Boleto, { getBarcodeDueDate } from '../models/Boleto';
import Reminder from '../models/Reminder';
import { getBoletoForReminder } from '../reducers/boletosReducer';
import {
    getNumberOfReminders,
    getReminder,
} from '../reducers/remindersReducer';

export function* createReminderSaga(action: Action) {
    if (isType(action, createReminderAction.started)) {
        const dueDate: Date = yield call(
            getBarcodeDueDate,
            action.payload.barcode,
        );

        const numberOfReminders: number = yield select(getNumberOfReminders);

        yield put(
            createReminderAction.done({
                params: action.payload,
                result: {
                    dueDate: addHours(startOfDay(dueDate), 10),
                    id: `${numberOfReminders + 1}`,
                },
            }),
        );
    }

    if (isType(action, createReminderAction.done)) {
        const reminder: Reminder = yield select(
            getReminder,
            action.payload.result.id,
        );

        yield call(
            [PushNotification, PushNotification.localNotificationSchedule],
            {
                data: JSON.stringify({
                    barcode: action.payload.params.barcode,
                }),
                date: new Date(reminder.date),
                id: action.payload.result.id,
                message: I18n.t('reminderSagas.notification.message'),
            },
        );
    }
}

export function* watchCreateReminder() {
    yield takeEvery(
        [createReminderAction.started, createReminderAction.done],
        createReminderSaga,
    );
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

    if (isType(action, deleteReminderAction.done)) {
        yield call(
            [PushNotification, PushNotification.cancelLocalNotifications],
            {
                id: action.payload.params.id,
            },
        );
    }
}

export function* watchDeleteReminder() {
    yield takeEvery(
        [deleteReminderAction.started, deleteReminderAction.done],
        deleteReminderSaga,
    );
}

export default function* reminderSagas() {
    yield all([watchCreateReminder(), watchDeleteReminder()]);
}
