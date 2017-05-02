# Creating a custom home page

In this tutorial we'll update the application to use a customized home page.

I'll be using Visual Studio Code as my editor and will use the lightweight setup using a fake backend with mock data.

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You are familiar with [TypeScript](https://egghead.io/courses/up-and-running-with-typescript), [JavaScript (ES6)](https://egghead.io/courses/learn-es6-ecmascript-2015), [Webpack](https://webpack.js.org/) and [React]((https://egghead.io/courses/react-fundamentals))

## Starting the application in debug mode

See [Starting the application in debug mode](./Change-the-skin.md#starting-the-application-in-debug-mode).

## Creating a new component which we will use as our home page

As a first step we'll create a new component called `Home`. 

1. Create a new directory called `custom-components` inside the `gui/src` directory
2. Create a new file called `Home.tsx` in this directory
3. I've chosen to add a Welcome message and a link to the product family list page as content of my Home component

```typescript
import * as React from "react";
import { Link } from "react-router";
import { path } from "utils/Path";
import "./styles/Home";

const Home = (): JSX.Element => {
    return (
        <section className="custom-home-component">
            <h1>Welcome!</h1>
            <div>
                <Link to={`${path.getRootPath()}productfamilylist`}>Continue to the product family list</Link>
            </div>
        </section>
    );
};

export default Home;
```

4. We'll also add some styles to this by creating a less file called `Home.less` inside the `gui/src/custom-components/styles` directory

```less
@import (reference) "~theme-styles";

.custom-home-component {
    position: relative;
    top: 50px;
    padding-top: 1px;
    max-width: @screenXl;
    margin: 0 auto;

    h1 {
        display: inline-block;
    }
}
```

## Change the application routing to use our newly created page as the new home page

In the previous step we've created a new component. Let's put this component into use using the `/home` url. I'll also add routing for the `/productfamilylist` url where I'll use the `ProductFamiliesList` component.

To do this we'll need to overwrite the default `App` component which is owning the routing of the application on the gui.

1. Create a new file called `App.tsx` in the same directory as we've put the `Home.tsx` file
2. To overwrite the default routing we'll need to overwrite the `render` method of the default `App` component

```typescript
import { Components } from "@sdl/delivery-ish-dd-webapp-gui";
import * as React from "react";
import { Route } from "react-router";
import Home from "./Home";
import { ProductFamiliesList } from "components/container/ProductFamiliesList";

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
```

This example is quite complex as it requires some knowledge of the source code. In future versions we'll provide a more easy way of doing this.

3. Update ´gui/Main.tsx´ to use our custom ´App´ component

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Services } from "@sdl/delivery-ish-dd-webapp-gui";
import { browserHistory } from "react-router";
import { Provider } from "react-redux";
import { IState } from "store/interfaces/State";
import { configureStore } from "store/Store";
import { Store } from "redux";
import App from "./custom-components/App";

// Custom imports
import "./custom-styles/skin-overwrites";

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
                <AppComp services={services} history={browserHistory as ReactRouter.History} />
            </Provider>, mainElement);
    }
};
render(App);
```

4. Update our build scripts for development purposses inside `gui/build/gulp-tasks/serve.js`

```javascript
// ...

const publicationContentRegex = /^\/app\/[0-9]+.*$/gi; // All urls starting with a number
const publicationsListContentRegex = /^\/app\/publications.*$/gi; // Publication list
const productFamiliesContentRegex = /^\/app\/productfamilylist.*$/gi; // Custom product families page
if (req.url.match(/^\/app(\/home(;jsessionid=[\w\d]+)?)?$/gi) ||
    req.url.match(publicationContentRegex) ||
    req.url.match(publicationsListContentRegex) ||
    req.url.match(productFamiliesContentRegex)) {
    req.url = '/index.html';
}

// ...
```

5. Update the backend to render the home page for the `/productfamilylist` url