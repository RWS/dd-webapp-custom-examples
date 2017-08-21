# Deploying your custom web application

After you've completed the [getting started guide](./Getting-started.md) and applied your custimization you can deploy your new web app as followed.

1. Build the application using Maven (build from the directory where the `pom.xml` file is located)

```bash
mvn clean install
```

2. Grab the build output from the `target` directory. Inside this directory there is a `*.war` file.
3. Deploy the war on Tomcat, see [Tomcat Web Application Deployment](https://tomcat.apache.org/tomcat-8.5-doc/deployer-howto.html)

After deployment is done you can still change the connection to the CD system inside the `cd_client_config.xml` and `udp-search-conf.xml` file. This can be found inside your tomcat intallation directory.
When deploying using the ROOT context the path would be something like `C:\Program Files\Apache Software Foundation\Tomcat 8.5\webapps\ROOT\WEB-INF\classes`.

A restart of the Tomcat service is required when changing the configuration.
