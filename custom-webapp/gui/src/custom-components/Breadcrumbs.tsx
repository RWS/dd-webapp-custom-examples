import * as React from "react";
import { Link } from "react-router"
import { path } from "utils/Path";
import { Breadcrumbs as BreadcrumbsBase } from "@sdl/delivery-ish-dd-webapp-gui/dist/typings/src/components/presentation/Breadcrumbs";

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
        const divComp = super.render();
        if (divComp.props && divComp.props.children) {
            const ulComp = divComp.props.children;
            if (ulComp.props && Array.isArray(ulComp.props.children)) {
                const liComp = ulComp.props.children[0];
                if (liComp.props && Array.isArray(liComp.props.children)) {
                    const liCompChilds = liComp.props.children as { props: { to: string, children: string } }[];
                    const homeLinkComp = liCompChilds[0];
                    const props = { ...homeLinkComp.props };
                    props.to = path.getRootPath() + "productfamilylist";
                    liCompChilds[0] = <Link {...props}>{props.children}</Link>;
                }
            }
        }
        return divComp;
    }
}
