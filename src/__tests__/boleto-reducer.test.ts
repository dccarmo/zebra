import { AddBoletoAction } from "../actions";
import Boleto from "../models/Boleto";
import boletoReducer from "../reducers/boleto-reducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("boleto reducer", () => {
    it("should add a boleto", () => {
        expect(boletoReducer([], AddBoletoAction(mockBoleto))).toEqual([mockBoleto]);
    });

    it("shouldn't add the same boleto twice", () => {
        let state: Boleto[] = [];

        state = boletoReducer(state, AddBoletoAction(mockBoleto));
        expect(boletoReducer(state, AddBoletoAction(mockBoleto))).toEqual([mockBoleto]);
    });
});
