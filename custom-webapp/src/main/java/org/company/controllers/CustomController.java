
package org.company.controllers;

import com.sdl.webapp.common.api.model.page.PageModelImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

import static com.sdl.webapp.common.controller.RequestAttributeNames.PAGE_MODEL;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class CustomController {

    /**
     * Custom routes for gui entry points
     *
     * @param request
     * @return
     */
    @RequestMapping(
            value = {"/productfamilylist"},
            method = GET
    )
    public String productFamilyList(HttpServletRequest request) {
        request.setAttribute(PAGE_MODEL, new PageModelImpl());
        return "home";
    }
}