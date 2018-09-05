# Change the skin using the Theming capabilities

In this tutorial we'll update the application skin using the Theming capabilities.

We'll be using Visual Studio Code as our editor and will use the lightweight setup using a fake backend with mock data.

> You can find the code for this tutorial [here](../../custom-webapp/gui/src)

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You are familiar with [LESS](http://lesscss.org/)

## Starting the application in debug mode

Before you start, install all npm packages by running the following command in the terminal:

```bash
cd gui
npm install
```

After installing the packages let's start up the server.

```bash
npm start
```

Any change we do inside the `gui` directory is now being picked up by the build.

## Edit webpack.config.js
Find and change the following piece of code:
```js
// Custom theme
"theme-styles": path.resolve(
    __dirname,
    "node_modules/@sdl/delivery-ish-dd-webapp-gui/src/theming/styles.less"
),
// Custom components overwrites
// ...
// Components aliases
"@sdl/dd/base": path.resolve(
    __dirname,
    "./src/theming/styles.less"
),
```
to 
```js
// Custom theme
"theme-styles": path.resolve(
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
)
```

## Updating the color scheme

Updating the color scheme can be done by opening up the `colors.less` file which is located inside the `gui/src/theming/` directory.

In here you can find a set of neutral and accent colors defined. Let's change this too.

It's not allowed to remove any of the colors in this list, it's only allowed to change the values of each variable. The  variable names can be considered as an API which allows you to easily upgrade your changes into the next version.

```less
// ---------------------------------------------------------------------------------------------------------------------
// This file contains global LESS variables that can be used across the application when specifying colors
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Neutral Colors
// ---------------------------------------------------------------------------------------------------------------------

@neutralColor1: #262C39;
@neutralColor2: #353B46;
@neutralColor3: #454B53;
@neutralColor4: #576172;
@neutralColor5: #7D8BAB;
@neutralColor6: #fff;
@neutralColor7: #2A3B4C; // Pickled Bluewood

// this colors should be discussed with UX guys
@neutralColor8: #292828; // Mine Shaft
@neutralColor9: #CCCCCC; // Silver
@neutralColor10: #999999; // Dusty Gray
@neutralColor11: #000000; // Black

// these are ok with UI Guys
@neutralColor12: #0E121E; // Vulcan

// ---------------------------------------------------------------------------------------------------------------------
// Accent Colors
// ---------------------------------------------------------------------------------------------------------------------

@accentColor1: black;
@accentColor2: #457CBF;
@accentColor3: #D04D52;
@accentColor4: #FFCF43;
@accentColor5: #F47F42;
@accentColor6: #BB96B4;
@accentColor7: #EB2C51; // Amaranth
@accentColor8: #0096D6; // Cerulean
```

After applying these changes you can see that the UI colors changed.

## Updating the company logo icon

Updating the icons can be done by opening up the `icons.less` file which is located inside the `gui/src/theming/` directory.

This file consist of [mixins](http://lesscss.org/features/#mixins-feature). The only thing we are allowed to change are the internals of each mixin.
It is not possible to rename them or change the input parameters. Like for the colors, the mixin names can be considered as an API for easier upgrades.

To update the company logo seen on the top left of the application we'll change the contents of the `.icon-company-logo()` mixin.

We're using a PNG image for this. We copied it into a new `images` directory that we've created inside the `theming` directory.

```less
.icon-company-logo() {
    background-image: url("./images/batman-logo.png");
    height: 50px;
    background-repeat: no-repeat;
}
```

## Updating some other icons

We'll also update some icons for the table of contents, as well as the search bar background image.
This is also done inside the `icons.less` file.

```less
.icon-breadcrumb-home() {
    .icon-home();
    background-repeat: no-repeat;
    filter: grayscale(1);
}

.icon-toc-expand() {
    .icon-plus-16x16-ico();
    filter: grayscale(1);
}

.icon-toc-collapse() {
    .icon-cross-16x16-ico();
    filter: grayscale(1);
}

.icon-toc-leaf() {
    .icon-dot-16x16-ico();
    filter: grayscale(1);
}

.background-search-bar() {
    background-color: @neutralColor5;
}
```

## Updating the application font

Updating the font can be done by opening up the `fonts.less` file which is located inside the `gui/src/theming/` directory.

By default there are 2 different fonts used. A font for the headers and one for anything else.

It's possible to either import a custom font or use a standard font.

In our example we change the font for the entire website to Arial.

```less
@import (reference) "colors.less";

// ---------------------------------------------------------------------------------------------------------------------
// This file contains global LESS variables that can be used across the application when using fonts
// ---------------------------------------------------------------------------------------------------------------------

@fontFamily: "Arial";
@fontHeaderFamily: "Arial";
@fontFamilyPath: "./fonts/Calibri W01 Regular";
@fontHeaderPath: "./fonts/PT Sans";
@fontFamilyFallback: "Comic Sans Ms";
@fontSize: 14px;
@fontColor: @neutralColor1;

.import-header-font() {
}

.import-regular-font() {
}

.header-font(@weight: 400, @size:20px, @height: 24px) {
    font-family: @fontHeaderFamily, @fontFamilyFallback;
    font-style: normal;
    font-weight: @weight;
    font-size: @size;
    line-height: @height;
}
```

Notice that we've also emptied the `.import-header-font()` and `.import-regular-font()` mixins.
As we're not using a custom font, these can be left blank.

## Advanced skinning changes

The changes above can be considered as simple cases of custom skinning. To fine-tune everything we'll need to do some more advanced changes.
We'll handle this inside the [Advanced skin changes using css](./Advanced-skinning.md) topic.
