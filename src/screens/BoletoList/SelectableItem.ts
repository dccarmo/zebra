import { NavigationActions } from "react-navigation";
import { connect, Dispatch } from "react-redux";

import { selectBarcodeAction } from "../../actions";
import Item, { ItemDispatchProps } from "./Item";

function mapDispatchToProps(dispatch: Dispatch<any>): ItemDispatchProps {
    return {
        onSelect: (barcode: string) => {
            dispatch(selectBarcodeAction(barcode));
            dispatch(NavigationActions.navigate({ routeName: "BoletoDetail" }));
        },
    };
}

const SelectableItem = connect(null, mapDispatchToProps)(Item);

export default SelectableItem;
