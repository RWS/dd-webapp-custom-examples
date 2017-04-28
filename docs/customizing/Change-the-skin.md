# Change the skin using the Theming capabilities

In this tutorial we'll update the application skin using the Theming capabilities.

I'll be using Visual Studio Code as my editor and will use the lightweight setup using a fake backend with mock data.

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You are familiar with [LESS](http://lesscss.org/)

## Starting the application in debug mode

Before I can start let's install all npm packages by running following command in the terminal:

```bash
cd gui
npm install
```

After installing the packages let's start up the server.

```bash
cd gui
npm start
```

Notice that this setup doesn't use a real backend but is only loading mock data.
From now on any change I'll do inside the `gui` directory will be picked up by the build. 

## Updating the color scheme

Updating the color scheme can be done by opening up the `colors.less` file which is located inside the `gui/src/theming/` directory.

In here you can find a set of neutral and accent colors defined. Let's change this to.

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

// ---------------------------------------------------------------------------------------------------------------------
// Accent Colors
// ---------------------------------------------------------------------------------------------------------------------

@accentColor1: black;
@accentColor2: #457CBF;
@accentColor3: #D04D52;
@accentColor4: #FFCF43;
@accentColor5: #F47F42;
@accentColor6: #BB96B4;
```

After applying these changes you can see that the UI colors changed. 
There are still some things we need to optimize, for example the button collors were not updated. This will be fixed in the upcomming versions.

## Updating the company logo icon

## Updating the application font