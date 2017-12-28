import { addHours, startOfDay } from 'date-fns';
import PushNotification from 'react-native-push-notification';
import { call, put, select } from 'redux-saga/effects';

import {
    createReminderAction,
    deleteReminderAction,
} from '../../actions/index';
import I18n from '../../constants/i18n';
import { getBarcodeDueDate } from '../../models/Boleto';
import Reminder from '../../models/Reminder';
import { getBoletoForReminder } from '../../reducers/boletosReducer';
import {
    getNumberOfReminders,
    getReminder,
} from '../../reducers/remindersReducer';
import { createReminderSaga, deleteReminderSaga } from '../reminderSagas';

const mockBarcode = '1234';
const mockId = '2';
const mockDate = new Date();

const mockBoleto = {
    barcode: mockBarcode,
    dateAdded: Date.now(),
    paid: true,
    reminderId: null,
    title: null,
};

const mockReminder: Reminder = {
    barcode: mockBarcode,
    date: addHours(startOfDay(mockDate), 10).getTime(),
    id: mockId,
};

const mockCreateReminderStartedAction = createReminderAction.started({
    barcode: mockBarcode,
});

const mockCreateReminderDoneAction = createReminderAction.done({
    params: { barcode: mockBarcode },
    result: { dueDate: addHours(startOfDay(mockDate), 10), id: mockId },
});

const mockDeleteReminderStartedAction = deleteReminderAction.started({
    id: mockId,
});

const mockDeleteReminderDoneAction = deleteReminderAction.done({
    params: { id: mockId },
    result: { barcode: mockBarcode },
});

describe('reminder sagas', () => {
    describe('dispatches the finished create reminder action', () => {
        const gen = createReminderSaga(mockCreateReminderStartedAction);

        it('gets the boleto due date', () => {
            expect(gen.next().value).toEqual(
                call(
                    getBarcodeDueDate,
                    mockCreateReminderStartedAction.payload.barcode,
                ),
            );
        });

        it('gets the number of reminders', () => {
            expect(gen.next(mockDate).value).toEqual(
                select(getNumberOfReminders),
            );
        });

        it('dispatches the done action', () => {
            expect(gen.next(1).value).toEqual(
                put(mockCreateReminderDoneAction),
            );
        });
    });

    describe('schedules local notification on devide', () => {
        const gen = createReminderSaga(mockCreateReminderDoneAction);

        it('gets reminder', () => {
            expect(gen.next(mockDate).value).toEqual(
                select(
                    getReminder,
                    mockCreateReminderDoneAction.payload.result.id,
                ),
            );
        });

        it('calls push notification lib', () => {
            expect(gen.next(mockReminder).value).toEqual(
                call(
                    [
                        PushNotification,
                        PushNotification.localNotificationSchedule,
                    ],
                    {
                        data: JSON.stringify({
                            barcode:
                                mockCreateReminderDoneAction.payload.params
                                    .barcode,
                        }),
                        date: new Date(mockReminder.date),
                        id: mockCreateReminderDoneAction.payload.result.id,
                        message: I18n.t('reminderSagas.notification.message'),
                    },
                ),
            );
        });
    });

    describe('dispatches the finished delete reminder action', () => {
        const gen = deleteReminderSaga(mockDeleteReminderStartedAction);

        it('fetches boleto based on the reminder id', () => {
            expect(gen.next().value).toEqual(
                select(
                    getBoletoForReminder,
                    mockDeleteReminderStartedAction.payload.id,
                ),
            );
        });

        it('dispatches the done action', () => {
            expect(gen.next(mockBoleto).value).toEqual(
                put(mockDeleteReminderDoneAction),
            );
        });
    });

    describe('cancel local notification on device', () => {
        const gen = deleteReminderSaga(mockDeleteReminderDoneAction);

        it('calls push notifications lib', () => {
            expect(gen.next().value).toEqual(
                call(
                    [
                        PushNotification,
                        PushNotification.cancelLocalNotifications,
                    ],
                    {
                        id: mockDeleteReminderDoneAction.payload.params.id,
                    },
                ),
            );
        });
    });
});
