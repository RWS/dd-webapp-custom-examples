import * as React from "react";
import { Link } from "react-router";
import { Breadcrumbs as BreadcrumbsBase } from "@sdl/dd/base/presentation/Breadcrumbs";

export class Breadcrumbs extends BreadcrumbsBase {
    public render(): JSX.Element {
        /**
         * See source implementation of render method to know what jsx is created:
         * node_modules/@sdl/delivery-ish-dd-webapp-gui/src/components/presentation/Breadcrumbs.tsx
         *
         * In this customization we've overwritten the Link component used for the Home item (className="home")
         *
         * <div className={"sdl-dita-delivery-breadcrumbs"}>
         *     <ul>
         *         <li>
         *             <Link className="home" title={homeLabel} to={`${path.getRootPath()}home`}>{homeLabel}</Link>
         *             <span className="separator" />
         *         </li>
         *         ...
         *     </ul>
         * </div>
         */
        const baseDivComp = super.render();
        let originalHomeLinkCompProps: { title: string; to: string, children: string } | undefined;
        let liComponents: {}[] = [];
        if (baseDivComp.props && baseDivComp.props.children) {
            const ulComp = baseDivComp.props.children;
            if (ulComp.props && Array.isArray(ulComp.props.children)) {
                liComponents = ulComp.props.children;
                const liComp = ulComp.props.children[0];
                if (liComp.props && Array.isArray(liComp.props.children)) {
                    const liCompChilds = liComp.props.children;
                    const homeLinkComp = liCompChilds[0];
                    originalHomeLinkCompProps = { ...homeLinkComp.props };
                }
            }
        }
        if (originalHomeLinkCompProps) {
            const updatedHomeUrl = originalHomeLinkCompProps.to.replace(/home$/gi, "productfamilylist");
            liComponents.splice(0, 1); // Remove the first item which is the Home link
            return (
                <div className={"sdl-dita-delivery-breadcrumbs"}>
                    <ul>
                        <li>
                            <Link className="home" title={originalHomeLinkCompProps.title} to={updatedHomeUrl}>
                                {originalHomeLinkCompProps.children}
                            </Link>
                            <span className="separator" />
                        </li>
                        {liComponents}
                    </ul>
                </div>
            );
        }
        return baseDivComp;
    }
}
