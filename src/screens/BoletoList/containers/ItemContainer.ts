import { connect, Dispatch } from 'react-redux';

import { selectBarcodeAction } from '../../../actions';
import Item, { ItemDispatchProps } from '../Item';

function mapDispatchToProps(dispatch: Dispatch<any>): ItemDispatchProps {
    return {
        onSelect: (barcode: string) => {
            dispatch(selectBarcodeAction(barcode));
        },
    };
}

const ItemContainer = connect(null, mapDispatchToProps)(Item);

export default ItemContainer;