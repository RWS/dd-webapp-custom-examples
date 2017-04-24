# Getting Started

Welcome to the new Content Delivery Web Application! This tutorial will take you through creating a custom application. 
We assume you are familiar with **TypeScript, JavaScript (ES6), Webpack, HTML, XML, React, LESS, CSS, Java, Spring, DXA and Maven**.

Some learning material:

1. [JavaScript (ES6)](https://egghead.io/courses/learn-es6-ecmascript-2015)
2. [TypeScript Getting Started](https://egghead.io/courses/up-and-running-with-typescript)
3. [TypeScript Tutorial](https://www.typescriptlang.org/docs/tutorial.html )
4. [React Fundamentals](https://egghead.io/courses/react-fundamentals)
5. [React Hello World](https://facebook.github.io/react/docs/hello-world.html)
6. [LESS](http://lesscss.org/)
7. [Webpack](https://webpack.js.org/)
8. [Webpack Course](https://egghead.io/courses/using-webpack-for-production-javascript-applications)
9. [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
10. [Maven Getting Started Guide](https://maven.apache.org/guides/getting-started/)
11. [Getting started with DXA 1.7](http://docs.sdl.com/LiveContent/content/en-US/SDL%20DXA-v7/GUID-D36601FA-88DD-48A6-A8C0-61159673C2F4)
12. [Developing on DXA Java](http://docs.sdl.com/LiveContent/content/en-US/SDL%20DXA-v7/GUID-BEDE64AE-1E23-4784-AE5E-7DA84B26F1AA)

## Software requirements

Make sure you have installed:

* A git desktop client
    * Required for working with sources
    * eg [SourceTree](https://www.sourcetreeapp.com/)
* [Node.js](https://nodejs.org/) 
    * 64 bit version is recommended
    * Install NodeJs v6.x or higher
* [Maven 3](https://maven.apache.org/download.cgi)
* An IDE which has support for TypeScript / LESS
    * [Atom](https://atom.io/)
    * [Sublime Text](https://www.sublimetext.com/)
    * [Visual Studio Code](https://code.visualstudio.com/)
    * ...
* An IDE which has support for Java
    * [IntelliJ IDEA](https://www.jetbrains.com/idea/specials/idea/idea.html)
    * ...

In the following guide I'm using IntelliJ IDEA Ultimate (for Java) and Visual Studio Code (for LESS / TypeScript / JavaScript).

## Create a new project using the Maven Archetype

First step we will need to do is to create a directory. 
I've create following directory on my machine: `D:\projects\kc-web-app\custom-webapp-examples\examples`. 
I'll be usign this directory further on inside my examples.

Ok Let's start by opening the command prompt and run:

```bash
cd "D:\projects\kc-web-app\custom-webapp-examples\examples"
mvn archetype:generate -ParchetypeArtifactId=dd-webapp-archetype -ParchetypeGroupId=com.sdl.delivery.ish
```





## Start customizing

### Change the skin using the Theming capabilities

### Advanced skin changes using css

### Creating a custom home page

### Extend json api exposed by DXA Ish Module

