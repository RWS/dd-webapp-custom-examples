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
