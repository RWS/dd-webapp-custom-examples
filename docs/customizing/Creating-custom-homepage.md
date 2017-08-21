# Creating a custom home page

In this tutorial we'll update the application to use a customized home page.

> You can find the code of this tutorial [here](../../custom-webapp/gui/src)

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You are familiar with [TypeScript](https://egghead.io/courses/up-and-running-with-typescript), [JavaScript (ES6)](https://egghead.io/courses/learn-es6-ecmascript-2015), [Webpack](https://webpack.js.org/) and [React](https://egghead.io/courses/react-fundamentals)

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
import { Utils } from "@sdl/delivery-ish-dd-webapp-gui";
import "./styles/Home";

const { path } = Utils;

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

In the previous step we've created a new component. Let's enable this component for the `/home` url.
I'll also add routing for the `/productfamilylist` url where I'll use the `ProductFamiliesList` component.

To do this we'll need to add some children to the `App` component which is owning the routing of the application on the gui.

Update `gui/src/Main.tsx` as followed.

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Components, Services, IState, configureStore } from "@sdl/delivery-ish-dd-webapp-gui";
import { Provider } from "react-redux";
import { Store } from "redux";
import { Route } from "react-router";

// Custom imports
import "./custom-styles/skin-overwrites";
import Home from "./custom-components/Home";

const { App } = Components.AppComp;
const { PageService, PublicationService, TaxonomyService, SearchService } = Services.Client;
const { localization} = Services.Common;
const { ProductFamiliesList } = Components.ProductFamiliesListComp;

const mainElement = document.getElementById("main-view-target");

/**
 * Set instances for services
 */
const services = {
    pageService: new PageService(),
    publicationService: new PublicationService(),
    localizationService: localization,
    taxonomyService: new TaxonomyService(),
    searchService: new SearchService()
};

const store: Store<IState> = configureStore({});

localization.setStore(store);

const render = (AppComp: typeof App): void => {
    if (!mainElement) {
        console.error(`Unable to locate element to render application.`);
    } else {
        ReactDOM.render(
            <Provider store={store}>
                <AppComp services={services}>
                    <Route path="home" component={Home} />,
                    <Route path="productfamilylist" component={ProductFamiliesList} />
                </AppComp>
            </Provider>, mainElement);
    }
};
render(App);
```

To do this we've added two extra `Route` components inside the `AppComp`.
One to use our custom `Home` for the `/home` url and one to show the `ProductFamiliesList` for the `/productfamilylist` url.

We also imported `Route` from `react-router` and our custom `Home` component on the top of this example.

## Update GUI dev environment build script

In order to have the GUI build working for the new route we need to change `gui/build/gulp-tasks/serve.js`.

```javascript
// ...

const publicationContentRegex = /^\/[0-9]+.*$/gi; // All urls starting with a number
const publicationsListContentRegex = /^\/publications.*$/gi;  // Publication list
const productFamiliesContentRegex = /^\/productfamilylist$/gi; // Custom product families page
if (
  req.url.match(/^(\/home(;jsessionid=[\w\d]+)?)?$/gi) ||
  req.url.match(publicationContentRegex) ||
  req.url.match(publicationsListContentRegex) ||
  req.url.match(productFamiliesContentRegex)
) {
  req.url = "/index.html";
}

// ...
```

## Add a new controller to the Java backend

To have deep linking working we'll need to add a controller to match the new url.

1. Create a new controller class (`src/main/java/org/company/controllers/CustomController.java`)

```java
package org.company.controllers;

import com.sdl.webapp.common.api.model.page.PageModelImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

import static com.sdl.webapp.common.controller.RequestAttributeNames.PAGE_MODEL;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class CustomController {

    /**
     * Custom routes for gui entry points
     *
     * @param request
     * @return
     */
    @RequestMapping(
            value = {"/productfamilylist"},
            method = GET
    )
    public String productFamilyList(HttpServletRequest request) {
        request.setAttribute(PAGE_MODEL, new PageModelImpl());
        return "home";
    }
}
```

2. Add a class to initilialize sprint configuration (`src/main/java/org/company/Initializer.java`)

```java
package org.company;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Initializes Spring context for web application.
 */
@Configuration
@ComponentScan(basePackages = "org.company")
public class Initializer {
}
```

3. Update the web app initializer (`src/main/java/com/sdl/delivery/ish/webapp/WebAppInitializer.java`) to load the `Initializer` class

```java
package com.sdl.delivery.ish.webapp;

import com.sdl.delivery.ish.webapp.module.SpringInitializer;
import com.sdl.delivery.ish.webapp.module.controller.PageController;
import lombok.extern.slf4j.Slf4j;
import org.company.Initializer;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import static com.sdl.webapp.common.util.InitializationUtils.loadActiveSpringProfiles;
import static com.sdl.webapp.common.util.InitializationUtils.registerListener;
import static com.sdl.webapp.common.util.InitializationUtils.registerServlet;

/**
 * WebApp initializer.
 */
@Slf4j
public class WebAppInitializer implements WebApplicationInitializer {

    /**
     * Executed when the app starts.
     *
     * @param servletContext
     * @throws ServletException
     */
    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        log.debug("Initializing servlet application context");
        AnnotationConfigWebApplicationContext servletAppContext = new AnnotationConfigWebApplicationContext();

        // Custom spring configuration is added to the end
        servletAppContext.register(SpringInitializer.class, PageController.class, Initializer.class);

        log.debug("Registering Spring ContextLoaderListener");
        registerListener(servletContext, new ContextLoaderListener(servletAppContext));

        log.debug("Registering Spring DispatcherServlet");
        registerServlet(servletContext, new DispatcherServlet(servletAppContext), "/").setLoadOnStartup(1);

        loadActiveSpringProfiles(servletContext, servletAppContext);
    }
}

```
