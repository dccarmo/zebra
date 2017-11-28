import { StatusBar } from "react-native";
import { NavigationLeafRoute, NavigationState } from "react-navigation";
import { call, select } from "redux-saga/effects";

import { colors } from "../../constants/index";
import { getNavigationState } from "../../selectors/index";
import { getCurrentRoute } from "../../utilities/NavigationUtils";
import { updateStatusBarSaga } from "../statusBarSagas";

const mockBarcodeReaderRoute: NavigationLeafRoute<any> = {
    key: "",
    params: "",
    routeName: "BarcodeReader",
};

const mockBoletoListRoute: NavigationLeafRoute<any> = {
    key: "",
    params: "",
    routeName: "BoletoList",
};

function createNavigationState(route: NavigationLeafRoute<any>): NavigationState {
    return {
        index: 0,
        routes: [
            route,
        ],
    };
}

describe("Status Bar Sagas", () => {
    describe("hides the status bar", () => {
        const gen = updateStatusBarSaga("ios", {} as any);
        const navigationState = createNavigationState(mockBarcodeReaderRoute);

        it("gets the navigation state", () => {
            expect(gen.next().value).toEqual(select(getNavigationState));
        });

        it("gets the current route", () => {
            expect(gen.next(navigationState).value).toEqual(call(getCurrentRoute, navigationState));
        });

        it("hides the status bar", () => {
            expect(gen.next(mockBarcodeReaderRoute).value).toEqual(call(StatusBar.setHidden, true, "slide"));
        });
    });

    describe("shows light themed status bar on iOS", () => {
        const gen = updateStatusBarSaga("ios", {} as any);
        const navigationState = createNavigationState(mockBoletoListRoute);

        it("gets the navigation state", () => {
            expect(gen.next().value).toEqual(select(getNavigationState));
        });

        it("gets the current route", () => {
            expect(gen.next(navigationState).value).toEqual(call(getCurrentRoute, navigationState));
        });

        it("shows the status bar", () => {
            expect(gen.next(mockBoletoListRoute).value).toEqual(call(StatusBar.setHidden, false, "slide"));
        });

        it("set status bar style", () => {
            expect(gen.next().value).toEqual(call(StatusBar.setBarStyle, "light-content"));
        });
    });

    describe("shows themed status bar on Android", () => {
        const gen = updateStatusBarSaga("android", {} as any);
        const navigationState = createNavigationState(mockBoletoListRoute);

        it("gets the navigation state", () => {
            expect(gen.next().value).toEqual(select(getNavigationState));
        });

        it("gets the current route", () => {
            expect(gen.next(navigationState).value).toEqual(call(getCurrentRoute, navigationState));
        });

        it("shows the status bar", () => {
            expect(gen.next(mockBoletoListRoute).value).toEqual(call(StatusBar.setHidden, false, "slide"));
        });

        it("set status bar style", () => {
            expect(gen.next().value).toEqual(call(StatusBar.setBarStyle, "light-content"));
        });

        it("set status bar background color", () => {
            expect(gen.next().value).toEqual(call(StatusBar.setBackgroundColor, colors.burgundy));
        });
    });
});
