import { NavigationLeafRoute, NavigationState } from 'react-navigation';

export function getCurrentRoute(
    navigationState: NavigationState,
): NavigationLeafRoute<any> {
    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
        return getCurrentRoute(route);
    }

    return route;
}
