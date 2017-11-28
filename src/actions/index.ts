import actionCreatorFactory from "typescript-fsa";

import Boleto from "../models/Boleto";
import WebServerInfo from "../models/WebServerInfo";

const actionCreator = actionCreatorFactory();

export const addBoletoAction = actionCreator<Boleto>("ADD_BOLETO");
export const selectBarcodeAction = actionCreator<string>("SELECT_BARCODE");
export const deselectBarcodeAction = actionCreator("DESELECT_BARCODE");
export const updateWebServerInfoAction = actionCreator<WebServerInfo>("UPDATE_WEB_SERVER");
