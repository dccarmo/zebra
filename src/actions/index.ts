import { ADD_BOLETO } from "../constants";

export type AddBoletoAction = {
    type: ADD_BOLETO,
    number: string
};

export type OtherAction = { type: "" };
export const OtherAction: OtherAction = { type: "" };
