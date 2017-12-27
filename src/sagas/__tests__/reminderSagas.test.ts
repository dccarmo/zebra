import { call, put, select } from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';

import {
    createReminderAction,
    deleteReminderAction,
} from '../../actions/index';
import { getBarcodeDueDate } from '../../models/Boleto';
import { getBoletoForReminder } from '../../reducers/boletosReducer';
import { createReminderSaga, deleteReminderSaga } from '../reminderSagas';

const mockBoleto = {
    barcode: '02191618900000166510010847800017732009402163',
    dateAdded: Date.now(),
    paid: true,
    reminderId: null,
    title: null,
};

const mockBarcode = '1234';
const mockId = 'abc';
const mockDate = new Date();

const mockCreateReminderStartedAction = createReminderAction.started({
    barcode: mockBarcode,
});

const mockCreateReminderDoneAction = createReminderAction.done({
    params: { barcode: mockBarcode },
    result: { dueDate: mockDate, id: mockId },
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

        it('creates a new id', () => {
            expect(gen.next(mockDate).value).toEqual(call(uuidv4));
        });

        it('dispatches the done action', () => {
            expect(gen.next(mockId).value).toEqual(
                put(mockCreateReminderDoneAction),
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
                put(
                    deleteReminderAction.done({
                        params: mockDeleteReminderStartedAction.payload,
                        result: {
                            barcode: mockBoleto.barcode,
                        },
                    }),
                ),
            );
        });
    });
});
