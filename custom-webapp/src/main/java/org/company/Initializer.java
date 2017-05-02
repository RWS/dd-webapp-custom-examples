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
