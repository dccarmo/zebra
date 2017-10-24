import React from "react";
import { addNavigationHelpers } from "react-navigation";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";

import BoletoListNavigator from "./navigators/BoletoListNavigator";
import reducers from "./reducers";
import AppStore from "./stores/AppStore";

const store = createStore(reducers);

// export const startApp = () => {
//   Navigation.registerComponent(screens.BoletoListScreen, () => BoletoListScreen, store, Provider);
//   Navigation.registerComponent(screens.BoletoReaderScreen, () => BoletoReaderScreen, store, Provider);
//   Navigation.registerComponent(screens.BoletoDetailScreen, () => BoletoDetailScreen, store, Provider);

//   if (Platform.OS === "android") {
//     Navigation.startSingleScreenApp({
//       drawer: {
//         disableOpenGesture: false,
//         left: {
//           screen: screens.BoletoListScreen,
//         },
//       },
//       screen: {
//         screen: screens.BoletoListScreen,
//         title: "Boletos",
//       },
//     });
//   } else {
//     Navigation.startTabBasedApp({
//     tabs: [
//       {
//         icon: require("../imgs/boleto_tab_icon.png"),
//         label: "Boletos",
//         screen: screens.BoletoListScreen,
//         title: "Boletos",
//       },
//       {
//         icon: require("../imgs/boleto_tab_icon.png"),
//         label: "Opções",
//         screen: screens.BoletoListScreen,
//         title: "Opções",
//       },
//     ],
//     tabsStyle: {
//       tabBarSelectedButtonColor: colors.monza,
//     },
//   });
//   }
// };

const NavigatorWrapper: React.SFC = (props: any) => (
    <BoletoListNavigator navigation={
        addNavigationHelpers({
            dispatch: props.dispatch,
            state: props.nav,
        })}
    />
);

const NavigatorContainer = connect(
    (state: AppStore): any => {
        return {
            nav: state.nav,
        };
    },
)(NavigatorWrapper);

const App: React.SFC = () => (
    <Provider store={store}>
        <NavigatorContainer />
    </Provider>
);

export default App;
