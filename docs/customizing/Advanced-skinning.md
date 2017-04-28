# Advanced skin changes using css

In this tutorial we'll update the application skin using the Theming capabilities.

I'll be using Visual Studio Code as my editor and will use the lightweight setup using a fake backend with mock data.

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You've completed the [Change the skin using the Theming capabilities](./Change-the-skin.md) tutorial
2. You are familiar with [LESS](http://lesscss.org/) and css

## Starting the application in debug mode

See [Starting the application in debug mode](./Change-the-skin.md#starting-the-application-in-debug-mode).

## Injecting a custom stylesheet file

In order to some more advanced changes to the skin we'll create a new custom less file which we'll load as part of the application.
This is considered to be more advanced and requires extra validation when upgrading you're application. 

1. Create a new directory inside the `gui/src` directory called `custom-styles`
2. Create a new less file called `skin-overwrites.less` inside this directory
3. Import `skin-overwrites.less` inside the `gui/src/Main.tsx` file

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Components, Services } from "@sdl/delivery-ish-dd-webapp-gui";
import { browserHistory } from "react-router";
import { Provider } from "react-redux";
import { IState } from "store/interfaces/State";
import { configureStore } from "store/Store";
import { Store } from "redux";

// Custom imports
import './custom-styles/skin-overwrites';

// ...
```

4. Add following content inside the `skin-overwrites.less` file

```less
@import (reference) "~theme-styles";

.sdl-dita-delivery-app {
    .sdl-dita-delivery-searchbar {
        background-image: none;
        background-color: @neutralColor5;
    }

    .sdl-dita-delivery-breadcrumbs ul li .separator {
        margin-right: 0px;
    }

    .sdl-button.graphene.sdl-button-purpose-confirm {
        background-color: @accentColor1;
        &:hover {
            opacity: 0.5;
        }
    }

    .sdl-dita-delivery-tile {
        background-color: #f6f6f6;
    }
}
```

The styles we've added inside the `skin-overwrites.less` will overwrite the styles of the buttons / tiles on the home page. 
We've also removed the background image from the search bar.

To get access to the mixins / variables defined inside the theming directory we've added an import on the top `@import (reference) "~theme-styles";`. 
This import can be used in any less file to get access to the theming api's.

If you end up with a lot of customizations it makes sense to create different less files to have a better overview. 
For example a less file for the changes on the home page, one for the table of contents, etc...
