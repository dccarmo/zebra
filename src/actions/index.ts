import actionCreatorFactory from "typescript-fsa";

import Boleto from "../models/Boleto";
import WebServerInfo from "../models/WebServerInfo";

const actionCreator = actionCreatorFactory();

export const AddBoletoAction = actionCreator<Boleto>("ADD_BOLETO");
export const SelectBarcodeAction = actionCreator<string>("SELECT_BARCODE");
export const StartWebServerAction = actionCreator("START_WEB_SERVER");
export const StopWebServerAction = actionCreator("STOP_WEB_SERVER");
export const UpdateWebServerInfoAction = actionCreator<WebServerInfo>("UPDATE_WEB_SERVER");
