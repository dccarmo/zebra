import { selectBarcodeAction } from "../../actions";
import selectedBarcodeReducer from "../selectedBarcodeReducer";

const mockBoleto = { barcode: "02191618900000166510010847800017732009402163", title: "", paid: true };

describe("Selected Barcode Reducer", () => {
    it("should set the selected barcode", () => {
        expect(selectedBarcodeReducer(undefined, selectBarcodeAction(mockBoleto.barcode)))
        .toEqual(mockBoleto.barcode);
    });
});
