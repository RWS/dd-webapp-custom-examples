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
