# Overwriting a GUI component

In this tutorial we'll update the application to be using an overwritten GUI component.

The entire GUI exists out of components, a component is a reusable piece within the UI which can be used in one or many places on the screen.

> You can find the code of this tutorial [here](../../custom-webapp/gui/src)

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You've completed the [Creating a custom home page](./Creating-custom-homepage.md) tutorial
3. You are familiar with [TypeScript](https://egghead.io/courses/up-and-running-with-typescript), [JavaScript (ES6)](https://egghead.io/courses/learn-es6-ecmascript-2015), [Webpack](https://webpack.js.org/) and [React](https://egghead.io/courses/react-fundamentals)

## Starting the application in debug mode

See [Starting the application in debug mode](./Change-the-skin.md#starting-the-application-in-debug-mode).

## Creating a custom breadcrumbs component

In this tutorial I'll update the breadcrumbs to use a custom url for the home page.
I'll be using the url I've created in the [Creating a custom home page](./Creating-custom-homepage.md) tutorial.

1. Create a new component file inside the `src/custom-components` directory called `Breadcrumbs.tsx`

```typescript
import * as React from "react";
import { Link } from "react-router"
import { path } from "utils/Path";
import { Breadcrumbs as BreadcrumbsBase } from "@sdl/delivery-ish-dd-webapp-gui/dist/typings/src/components/presentation/Breadcrumbs";

export class Breadcrumbs extends BreadcrumbsBase {
    public render(): JSX.Element {
        const baseComp = super.render();
        if (baseComp.props && baseComp.props.children) {
            const ulComp = baseComp.props.children;
            if (ulComp.props && Array.isArray(ulComp.props.children)) {
                const liComp = ulComp.props.children[0];
                if (liComp.props && Array.isArray(liComp.props.children)) {
                    const liCompChilds = liComp.props.children as { props: { to: string, children: string } }[];
                    const homeLinkComp = liCompChilds[0];
                    const props = { ...homeLinkComp.props };
                    props.to = path.getRootPath() + "productfamilylist";
                    liCompChilds[0] = <Link {...props}>{props.children}</Link>;
                }
            }
        }
        return baseComp;
    }
}
```

We've imported the default BreadCrumbs implementation using `@sdl/delivery-ish-dd-webapp-gui/dist/typings/src/components/presentation/Breadcrumbs` as it's location. 
For this to work we'll need to change some configuration inside our webpack file, we'll handle this in the next section.

In future versions we'll improve the syntax to overwrite the components by providing aliases.

## Overwriting the default breadcrumbs implementation

To use the component we created in the previous step we'll need to change the webpack configuration which can be found inside `src/webpack.config.js`.

We'll add some extra configuration inside the `config > resolve > alias` configuration.

```javascript
const config = {
    // ...
    resolve: {
        // ...
        alias: {
            React: 'react',
            ReactDOM: 'react-dom',
            ReactDOMServer: 'react-dom/server',
            // Custom theme
            'theme-styles.less': path.resolve(__dirname, 'src/theming/styles.less'),
            // Custom components overwrites
            'components/presentation/Breadcrumbs': path.resolve(__dirname, 'src/custom-components/Breadcrumbs.tsx'),
            '@sdl/delivery-ish-dd-webapp-gui/dist/typings/src/components/presentation/Breadcrumbs':
                path.resolve(__dirname, 'node_modules/@sdl/delivery-ish-dd-webapp-gui/dist/lib/components/presentation/Breadcrumbs.js')
        },
        // ...
    },
    // ...
}
```

In order for these change to take effect you'll need to stop your dev server and restart it using `npm start`.