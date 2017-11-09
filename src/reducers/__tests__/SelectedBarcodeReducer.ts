import { SelectBarcodeAction } from "../../actions";
import SelectedBarcodeReducer from "../selectedBarcodeReducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("selected barcode reducer", () => {
    it("should set the selected barcode", () => {
        expect(SelectedBarcodeReducer.reducer(undefined, SelectBarcodeAction(mockBoleto.barcode)))
        .toEqual(mockBoleto.barcode);
    });
});
