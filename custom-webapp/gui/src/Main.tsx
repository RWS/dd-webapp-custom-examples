import * as React from "react";
import * as ReactDOM from "react-dom";
import { Components, Services } from "@sdl/delivery-ish-dd-webapp-gui";
import { browserHistory } from "react-router";
import { Provider } from "react-redux";
import { IState } from "store/interfaces/State"; // TODO: import from @sdl/delivery-ish-dd-webapp-gui
import { configureStore } from "store/Store"; // TODO: import from @sdl/delivery-ish-dd-webapp-gui
import { Store } from "redux";
import { Route } from "react-router";

const { App } = Components.AppComp;
const { ProductFamiliesList } = Components.ProductFamiliesListComp;

// Custom imports
import "./custom-styles/skin-overwrites";
import Home from "./custom-components/Home";

const { PageService, PublicationService, TaxonomyService } = Services.Client;
const { localization} = Services.Common;

const mainElement = document.getElementById("main-view-target");

/**
 * Set instances for services
 */
const services = {
    pageService: new PageService(),
    publicationService: new PublicationService(),
    localizationService: localization,
    taxonomyService: new TaxonomyService()
};

const store: Store<IState> = configureStore({});

localization.setStore(store);

const render = (AppComp: typeof App): void => {
    if (!mainElement) {
        console.error(`Unable to locate element to render application.`);
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <AppComp services={services} history={browserHistory as ReactRouter.History}>
                    <Route path="home" component={Home} />,
                    <Route path="productfamilylist" component={ProductFamiliesList} />
                </AppComp>
            </Provider>, mainElement);
    }
};
render(App);
