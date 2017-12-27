import actionCreatorFactory from 'typescript-fsa';

import WebServerInfo from '../models/WebServerInfo';

const actionCreator = actionCreatorFactory();

// Boleto

export const addBoletoAction = actionCreator<{ barcode: string }>('ADD_BOLETO');
export const deleteBoletoAction = actionCreator<{ barcode: string }>(
    'DELETE_BOLETO',
);
export const deselectBarcodeAction = actionCreator('DESELECT_BARCODE');
export const requestDeleteBoletoAction = actionCreator<{ barcode: string }>(
    'REQUEST_DELETE_BOLETO',
);
export const selectBarcodeAction = actionCreator<{ barcode: string }>(
    'SELECT_BARCODE',
);
export const toggleBoletoPaidAction = actionCreator<{
    barcode: string;
}>('TOGGLE_BOLETO_PAID_ACTION');
export const updateBoletoTitleAction = actionCreator<{
    barcode: string;
    title: string;
}>('UPDATE_BOLETO_TITLE_ACTION');

// Reminder

export const createReminderAction = actionCreator.async<
    { barcode: string },
    { id: string, dueDate: Date | null }
>('CREATE_REMINDER');
export const deleteReminderAction = actionCreator.async<{ id: string }, { barcode: string }>(
    'DELETE_REMINDER',
);

// Web Server

export const updateWebServerInfoAction = actionCreator<WebServerInfo>(
    'UPDATE_WEB_SERVER',
);
