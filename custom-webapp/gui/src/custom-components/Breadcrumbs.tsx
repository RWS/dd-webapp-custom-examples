import * as React from "react";
import { Link } from "react-router"
import { path } from "utils/Path";
import { Breadcrumbs as BreadcrumbsBase } from "@sdl/delivery-ish-dd-webapp-gui/dist/typings/src/components/presentation/Breadcrumbs";

export class Breadcrumbs extends BreadcrumbsBase {
    public render(): JSX.Element {
        const baseComp = super.render();
        if (baseComp.props && baseComp.props.children) {
            const ulComp = baseComp.props.children;
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
        return baseComp;
    }
}
