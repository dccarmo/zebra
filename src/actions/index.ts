import actionCreatorFactory from 'typescript-fsa';

import Boleto from '../models/Boleto';
import WebServerInfo from '../models/WebServerInfo';

const actionCreator = actionCreatorFactory();

export const addBoletoAction = actionCreator<Boleto>('ADD_BOLETO');
export const deselectBarcodeAction = actionCreator('DESELECT_BARCODE');
export const selectBarcodeAction = actionCreator<string>('SELECT_BARCODE');
export const toggleBoletoPaidAction = actionCreator<{
    barcode: string;
}>('TOGGLE_BOLETO_PAID_ACTION');
export const updateBoletoTitleAction = actionCreator<{
    barcode: string;
    title: string;
}>('UPDATE_BOLETO_TITLE_ACTION');
export const updateWebServerInfoAction = actionCreator<WebServerInfo>(
    'UPDATE_WEB_SERVER',
);
