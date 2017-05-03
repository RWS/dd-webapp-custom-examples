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
