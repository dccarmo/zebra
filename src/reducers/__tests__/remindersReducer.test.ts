import { addHours, startOfDay } from 'date-fns';

import { createReminderAction, deleteReminderAction } from '../../actions/index';
import Reminder from '../../models/Reminder';
import { AppStore } from '../../stores/index';
import { allIds, byId, getReminder, getNumberOfReminders } from '../remindersReducer';

const mockCreateReminderAction = createReminderAction.done({
    params: { barcode: '1234' },
    result: { dueDate: new Date(), id: 'abc' },
});

const mockDeleteReminderAction = deleteReminderAction.done({
    params: { id: 'abc' },
    result: { barcode: '1234' },
});

const mockReminder: Reminder = {
    barcode: '1234',
    date: 0,
    id: 'abc',
};

const mockByIdInitialState: { [_: string]: Reminder } = {
    abc: mockReminder,
};

const mockAppStore: AppStore = {
    boletos: {
        allBarcodes: [],
        byBarcode: {},
    },
    navigation: {} as any,
    reminders: {
        allIds: ['abc'],
        byId: mockByIdInitialState,
    },
    webServerInfo: {} as any,
};

const mockAllIdsInitialState: string[] = ['abc'];

describe('reminders selectors', () => {
    it('gets reminder', () => {
        expect(getReminder(mockAppStore, 'abc')).toEqual(mockReminder);
    });

    it('gets number of reminders', () => {
        expect(getNumberOfReminders(mockAppStore)).toBe(1);
    });
});

describe('reminders reducer', () => {
    describe('by id', () => {
        it('creates reminder', () => {
            expect(byId(undefined, mockCreateReminderAction)).toEqual({
                abc: {
                    barcode: '1234',
                    date: mockCreateReminderAction.payload.result.dueDate.getTime(),
                    id: 'abc',
                },
            });
        });

        it('deletes reminder', () => {
            expect(byId(mockByIdInitialState, mockDeleteReminderAction)).toEqual({});
        });
    });

    describe('all ids', () => {
        it('adds id to list', () => {
            expect(allIds(undefined, mockCreateReminderAction)).toEqual(['abc']);
        });

        it('removes id from list', () => {
            expect(allIds(mockAllIdsInitialState, mockDeleteReminderAction)).toEqual([]);
        });
    });
});
