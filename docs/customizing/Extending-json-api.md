# Extending the json API exposed by the DXA Ish Module

In this tutorial we'll update the DXA Ish Module json API.

We'll be using IntelliJ as our IDE.

> You can find the code of this tutorial [here](../../custom-webapp/gui/src)

## Prerequisites

1. You've completed the [getting started guide](../Getting-started.md)
2. You are familiar with Java, [Spring MVC](https://spring.io/guides/gs/serving-web-content/) and [DXA](http://docs.sdl.com/LiveContent/content/en-US/SDL%20DXA-v7/GUID-D36601FA-88DD-48A6-A8C0-61159673C2F4)

## Starting the application in debug mode

Complete the [getting started guide](../Getting-started.md) and do `Run` -> `Debug 'Tomcat'`.

## Adding Spring initialize class

In order for the classes to be loaded you need to create a Spring initializer class first.

This step is described inside the [Creating a custom home page](./Creating-custom-homepage.md#add-a-new-controller-to-the-java-backend) tutorial.

## Adding extra metadata to the page API

In this example we'll add some dummy field into the page metadata.

The only step is to create a new class called `CustomContentService` (`src/main/java/org/company/providers/CustomContentService.java`) with the following code inside:

```java
package org.company.providers;

import com.sdl.delivery.ish.webapp.module.localization.IshLocalization;
import com.sdl.delivery.ish.webapp.module.providers.ContentService;
import com.sdl.webapp.common.api.content.ContentProviderException;
import com.sdl.webapp.common.api.model.PageModel;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Service
@Primary
public class CustomContentService extends ContentService {

    /**
     * Get page model.
     *
     * @param pageId       Page id
     * @param localization Localization
     * @param contextPath  Context path, used for updating urls inside topic html
     * @return The page model
     * @throws ContentProviderException
     */
    public PageModel getPageModel(Integer pageId, IshLocalization localization, String contextPath)
            throws ContentProviderException {
        PageModel pageModel = super.getPageModel(pageId, localization, contextPath);

        // Add custom metadata
        pageModel.getMeta().put("CustomMetadata", "Some custom metadata field!");

        return pageModel;
    }
}
```

The `@Primary` annotation is used to overwrite the default `ContentService` implementation.  This way we can override the data which is returned from the controllers. 
The Content Service also allows you to overwite the binary data (images, pdf...) using the `getBinaryContent` method.

## Adding extra metadata to the table of contents (TOC) API

It is also possible to add custom metadata to the TOC's API. 
In this example we'll add a dummy property called `CustomMetadata` to all the item in the TOC API response.
The TOC has a nested structure, so it comes with a couple of challenges.

1. Create a new model called `CustomTaxonomyNode` (`src/main/java/org/company/models/CustomTaxonomyNode.java`)

```java
package org.company.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sdl.delivery.ish.webapp.module.model.IshTaxonomyNode;

public class CustomTaxonomyNode extends IshTaxonomyNode {

    @JsonProperty("CustomMetadata")
    private String customMetadata;

    public CustomTaxonomyNode(IshTaxonomyNode other) {
        this.setId(other.getId());
        this.setType(other.getType());
        this.setUrl(other.getUrl());
        this.setTitle(other.getTitle());
        this.setVisible(other.isVisible());
        this.setItems(other.getItems());
        this.setKey(other.getKey());
        this.setWithChildren(other.isWithChildren());
        this.setDescription(other.getDescription());
        this.setTaxonomyAbstract(other.isTaxonomyAbstract());
        this.setClassifiedItemsCount(other.getClassifiedItemsCount());
    }

    public void setCustomMetadata(String customMetadata) {
        this.customMetadata = customMetadata;
    }
}
```

2. Create a new service called `CustomTocService` (`src/main/java/org/company/providers/CustomTocService.java`) 

```java
package org.company.providers;

import com.sdl.delivery.ish.webapp.module.model.IshTaxonomyNode;
import com.sdl.delivery.ish.webapp.module.providers.TocService;
import com.sdl.webapp.common.api.WebRequestContext;
import com.sdl.webapp.common.api.model.entity.SitemapItem;
import org.company.models.CustomTaxonomyNode;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Primary
@Service
public class CustomTocService extends TocService {
    public Collection<SitemapItem> getToc(Integer publicationId, String sitemapItemId, boolean includeAncestors,
                                          int descendantLevels, HttpServletRequest request,
                                          WebRequestContext webRequestContext) {

        Collection<SitemapItem> tocItems = super.getToc(publicationId, sitemapItemId, includeAncestors, descendantLevels, request, webRequestContext);

        // Loop over all items recursively
        Set<SitemapItem> updatedItems = new HashSet<>(tocItems.size());
        for (SitemapItem item : tocItems) {
            SitemapItem newItem = setCustomMetadata(item);
            newItem.setItems((Set<SitemapItem>)this.updateChildItems(newItem));
            updatedItems.add(newItem);
        }

        return updatedItems;
    }

    private Collection<SitemapItem> updateChildItems(SitemapItem item) {
        Collection<SitemapItem> childItems = item.getItems();
        if (childItems != null && childItems.size() > 0) {
            Set<SitemapItem> updatedItems = new HashSet<>(childItems.size());
            for (SitemapItem childItem : childItems) {
                SitemapItem newItem = setCustomMetadata(childItem);
                newItem.setItems((Set<SitemapItem>) this.updateChildItems(newItem));
                updatedItems.add(newItem);
            }
            return updatedItems;
        }
        return childItems;
    }

    private SitemapItem setCustomMetadata(SitemapItem item) {
        if (item instanceof IshTaxonomyNode) {
            CustomTaxonomyNode customItem = new CustomTaxonomyNode((IshTaxonomyNode) item);
            customItem.setCustomMetadata("custom-metadata");
            return customItem;
        }
        return item;
    }
}
```

The `@Primary` annotation is used to overwrite the default `TocService` implementation. 
We need to loop over all the items inside the structure, including the nested ones.
In most of the cases the UI will ask the TOC items level per level, meaning there is no nesting. Nesting is currently used to get the location of an item in the TOC.  This is then used to expand the TOC to its correct location when coming in using a direct link to a page.
