import actionCreatorFactory from "typescript-fsa";

import { ADD_BOLETO } from "../constants";

// export type AddBoletoAction = {
//     type: ADD_BOLETO,
//     data: string
// };

// export type OtherAction = { type: "" };
// export const OtherAction: OtherAction = { type: "" };

const actionCreator = actionCreatorFactory();

export const AddBoletoAction = actionCreator<{data: string}>(ADD_BOLETO);
