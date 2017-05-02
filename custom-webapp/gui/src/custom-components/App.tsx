import { Components } from "@sdl/delivery-ish-dd-webapp-gui";
import * as React from "react";
import { Route } from "react-router";
import Home from "./Home";
import { ProductFamiliesList } from "components/container/ProductFamiliesList"; // TODO: import from @sdl/delivery-ish-dd-webapp-gui

class App extends Components.AppComp.App {
    public render(): JSX.Element {
        /**
         * In order to know where we can inject the proper overwrite have a look at the source code of the App component.
         * This can be found inside the node_modules directory of your project.
         * node_modules/@sdl/delivery-ish-dd-webapp-gui/src/components/container/App.tsx
         */
        const routerComp = super.render();
        if (routerComp.props && routerComp.props.children) {
            const routeComp = routerComp.props.children;
            if (routeComp && Array.isArray(routeComp.props.children)) {
                const routes = routeComp.props.children as {}[];
                routes.unshift([
                    <Route path="home" component={Home} />,
                    <Route path="productfamilylist" component={ProductFamiliesList} />
                ]);
            }
        }
        return routerComp;
    }
}

export default App;
