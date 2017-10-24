import { NavigationRouteConfigMap, StackNavigator } from "react-navigation";

import BarcodeReader from "../screens/BarcodeReader";
import BoletoDetail from "../screens/BoletoDetail";
import BoletoList from "../screens/BoletoList";

const routeConfigMap: NavigationRouteConfigMap = {
    BarcodeReader: { screen: BarcodeReader },
    BoletoDetail: { screen: BoletoDetail },
    BoletoList: { screen: BoletoList },
};

const BoletoListNavigator = StackNavigator(routeConfigMap);

export default BoletoListNavigator;
