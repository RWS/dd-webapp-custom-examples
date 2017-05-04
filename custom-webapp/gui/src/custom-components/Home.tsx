import * as React from "react";
import { Link } from "react-router";
import { Utils } from "@sdl/delivery-ish-dd-webapp-gui";
import "./styles/Home";

const { path } = Utils;

const Home = (): JSX.Element => {
    return (
        <section className="custom-home-component">
            <h1>Welcome!</h1>
            <div>
                <Link to={`${path.getRootPath()}productfamilylist`}>Continue to the product family list</Link>
            </div>
        </section>
    );
};

export default Home;
