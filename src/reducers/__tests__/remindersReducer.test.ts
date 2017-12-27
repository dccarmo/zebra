import { addHours, startOfDay } from 'date-fns';

import { createReminderAction, deleteReminderAction } from '../../actions/index';
import Reminder from '../../models/Reminder';
import { allIds, byId } from '../remindersReducer';

const mockCreateReminderAction = createReminderAction.done({
    params: { barcode: '1234' },
    result: { dueDate: new Date(), id: 'abc' },
});

const mockDeleteReminderAction = deleteReminderAction.done({
    params: { id: 'abc' },
    result: { barcode: '1234' },
});

const mockByIdInitialState: { [_: string]: Reminder } = {
    abc: {
        barcode: '1234',
        date: 0,
        id: 'abc',
    },
};

const mockAllIdsInitialState: string[] = ['abc'];

describe('reminders reducer', () => {
    describe('by id', () => {
        it('creates reminder', () => {
            expect(byId(undefined, mockCreateReminderAction)).toEqual({
                abc: {
                    barcode: '1234',
                    date:
                        addHours(
                            startOfDay(
                                mockCreateReminderAction.payload.result
                                    .dueDate!,
                            ),
                            10,
                        ).getTime() / 1000,
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
