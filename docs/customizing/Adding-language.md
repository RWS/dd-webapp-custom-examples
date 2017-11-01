# Adding new language

In this tutorial we'll add new language to the application to be used in App.

> You can find the code of this tutorial [here](../../custom-webapp/gui/src)

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You've completed the [Creating a custom home page](./Creating-custom-homepage.md) tutorial
4. You've completed the [Overwriting a GUI component](./Overwriting-gui-component.md) tutorial
5. You are familiar with [TypeScript](https://egghead.io/courses/up-and-running-with-typescript), [JavaScript (ES6)](https://egghead.io/courses/learn-es6-ecmascript-2015), [Webpack](https://webpack.js.org/) and [React](https://egghead.io/courses/react-fundamentals)

## Starting the application in debug mode

See [Starting the application in debug mode](./Change-the-skin.md#starting-the-application-in-debug-mode).

## Creating a new language resources file

In this tutorial I'll add new language.
I'll be using the URL I've created in the [Creating a custom home page](./Creating-custom-homepage.md) tutorial.

1. Create a new .resjson file inside the `src/resources` directory called `resources.es.resjson`

And add translations in Spanish language [Disclaimer: translations in example are taken from automated translation tool, and might be incorect and funnty for native speakers]
```json
{
    //...
    "components.conditions.dialog.personalize": "Personalizar",
    "components.conditions.dialog.cancel": "Cancelar",
    "components.contentnavigation.title": "Contenido",
    //...
}
```

## Creating a custom Localization Service

We need to update the localization service to use a new Language.

2. Create a new service file inside the `src/custom-services` directory called `Localization Service.ts`

```typescript
import { String } from "@sdl/models";
import {
    LocalizationService as LocalizationServiceBase,
    DEFAULT_LANGUAGE,
    DEFAULT_LANGUAGES
} from "@custom-sdl/dd/base/services/common/LocalizationService";

const ES_LANGUAGE = "es";

DEFAULT_LANGUAGES.push(ES_LANGUAGE);

export { DEFAULT_LANGUAGE, DEFAULT_LANGUAGES };

interface IDic {
    [path: string]: string;
}

const LanguageResources: IDic = require("resources.es.resjson") as IDic;
const translate = (path: string) => (path in LanguageResources ? LanguageResources[path] : null);
const formatMessage = (resource: string, variables?: string[]) => (Array.isArray(variables) ? String.format(resource, variables) : resource);

/**
 * Localization service
 *
 * @export
 * @class LocalizationService
 * @implements {ILocalizationService}
 */
export class LocalizationService extends LocalizationServiceBase {
    /**
     * Format a message
     *
     * @param {string} path Resource path
     * @param {string[]} [variables] Variables
     * @returns {string}
     */
    public formatMessage(path: string, variables?: string[]): string {
        const lang = this.getLanguage();
        if (lang == ES_LANGUAGE) {
            const resource = translate(path);
            if (resource) {
                return formatMessage(resource, variables);
            }
        }

        return super.formatMessage(path, variables);
    }
}

export let localization = new LocalizationService();
```

We have imported the default Localization Service implementation using `@custom-sdl/dd/base/services/common/LocalizationService` as it's location.
The `@custom-sdl/dd` prefix is to provide a way of still having access to the default implementation when overwriting the alias of a certain component.

We did also overwrite the `formatMessage` method, to check new language first, and if it is selected, use the resources from it.

**Note The `@custom-sdl/dd` prefix we used, to be able to run the instance in debug mode, we have to also modify `tsconfig.json` file adding the following section into   `compilerOptions > paths` to resolve this resources:**
```json
    // ...
    "paths": {
      /* Section to add to resolve services */
      "@custom-sdl/dd/base/services/*": ["node_modules/@sdl/delivery-ish-dd-webapp-gui/dist/typings/src/services/*"],
      /* Section end */
    },
    // ...
```

## Overwriting the default Localization Service implementation

To use the new language we created in the previous step we have to change the webpack configuration at `src/webpack.config.js`.

We'll add some extra configuration inside the `config > resolve > alias` configuration.

Put the custom overwrite after the `// Custom components overwrites` comment.
This is important as the sequence is used to resolve dependencies in a certain order.

```javascript
const config = {
    // ...
    resolve: {
        // ...
        alias: {
          React: "react",
          ReactDOM: "react-dom",
          ReactDOMServer: "react-dom/server",
          // Custom theme
          "theme-styles.less": path.resolve(
            __dirname,
            "./src/theming/styles.less"
          ),
          // Components aliases
          "@sdl/dd/base": path.resolve(
            __dirname,
            "node_modules/@sdl/delivery-ish-dd-webapp-gui/dist/lib/components"
          ),
          "@sdl/dd": path.resolve(
            __dirname,
            "node_modules/@sdl/delivery-ish-dd-webapp-gui/dist/lib/components"
          ),

          // Custom overwrites

          // Section to resolve base class for services
          "@custom-sdl/dd/base/services": path.resolve(__dirname, "node_modules/@sdl/delivery-ish-dd-webapp-gui/dist/lib/services"),
          // Additional languages resolver
          "resources.es.resjson": path.resolve(__dirname, "./src/resources/resources.es.resjson"),

          // Section to resolve localization service
          "services/common/LocalizationService": path.resolve(__dirname, "./src/custom-services/LocalizationService.ts")
        },
        // ...
    },
    // ...
}
```

In order for these change to take effect you'll need to stop your dev server and restart it using `npm start`.