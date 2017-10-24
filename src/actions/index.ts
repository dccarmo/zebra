import actionCreatorFactory from "typescript-fsa";

import Boleto from "../models/Boleto";

const actionCreator = actionCreatorFactory();

export const AddBoletoAction = actionCreator<Boleto>("ADD_BOLETO");
export const SelectBarcodeAction = actionCreator<string>("SELECT_BARCODE");
