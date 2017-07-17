import { AddBoletoAction } from "../actions";
import Boleto from "../models/Boleto";
import boletoReducer from "../reducers/boleto-reducer";

const mockData = "02191618900000166510010847800017732009402163";

describe("boleto reducer", () => {
    it("should add a boleto", () => {
        expect(boletoReducer([], AddBoletoAction({ data: mockData }))).toEqual([
            {
                data: mockData,
            },
        ]);
    });

    it("shouldn't add the same boleto twice", () => {
        let state: Boleto[] = [];

        state = boletoReducer(state, AddBoletoAction({ data: mockData }));
        expect(boletoReducer(state, AddBoletoAction({ data: mockData }))).toEqual([
            {
                data: mockData,
            },
        ]);
    });
});
