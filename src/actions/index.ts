import actionCreatorFactory from "typescript-fsa";

import { ADD_BOLETO } from "../constants";
import Boleto from "../models/Boleto";

// export type AddBoletoAction = {
//     type: ADD_BOLETO,
//     data: string
// };

// export type OtherAction = { type: "" };
// export const OtherAction: OtherAction = { type: "" };

const actionCreator = actionCreatorFactory();

export const AddBoletoAction = actionCreator<Boleto>(ADD_BOLETO);
