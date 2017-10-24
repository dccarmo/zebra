import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

import { SelectBarcodeAction } from "../../actions";
import Item, { ItemDispatchProps } from "./Item";

function mapDispatchToProps(dispatch: any): ItemDispatchProps {
    return {
        onSelect: (barcode: string) => {
            dispatch(SelectBarcodeAction(barcode));
            dispatch(NavigationActions.navigate({ routeName: "BoletoDetail" }));
        },
    };
}

const SelectableItem = connect(null, mapDispatchToProps)(Item);

export default SelectableItem;
