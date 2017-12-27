import { addHours, startOfDay } from 'date-fns';
import { Action } from 'redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createSelector } from 'reselect';
import { isType } from 'typescript-fsa';

import { createReminderAction, deleteReminderAction } from '../actions/index';
import Reminder from '../models/Reminder';
import { AppStore } from '../stores/index';

export const getReminder = createSelector((state: AppStore, id: string) => {
    return state.reminders.byId[id];
}, (reminder) => reminder);

export function byId(
    state: { [_: string]: Reminder } = {},
    action: Action,
): { [_: string]: Reminder } {
    if (isType(action, createReminderAction.done)) {
        if (action.payload.result.dueDate) {
            return {
                ...state,
                [action.payload.result.id]: {
                    barcode: action.payload.params.barcode,
                    date:
                        addHours(
                            startOfDay(action.payload.result.dueDate),
                            10,
                        ).getTime() / 1000,
                    id: action.payload.result.id,
                },
            };
        }
    }

    if (isType(action, deleteReminderAction.done)) {
        const { [action.payload.params.id]: _, ...newState } = state;

        return newState;
    }

    return state;
}

export function allIds(state: string[] = [], action: Action) {
    if (isType(action, createReminderAction.done)) {
        return [...state, action.payload.result.id];
    }

    if (isType(action, deleteReminderAction.done)) {
        return state.filter((id) => id !== action.payload.params.id);
    }

    return state;
}

const config = {
    key: 'reminders',
    storage,
};

const remindersReducer = persistCombineReducers(config, {
    allIds,
    byId,
});

export default remindersReducer;
