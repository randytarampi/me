import {expect} from "chai";
import {Map} from "immutable/dist/immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {mount} from "../../../../../util";
import React from "react";
import Link from "../../../../../../src/lib/components/link";
import InternalLink, * as internalLinks from "../../../../../../src/lib/components/link/internal";

describe("InternalLink", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
    });

    it("renders", function () {
        const stubProps = {
            href: "woof",
            serviceName: "meow",
            serviceType: "grr"
        };
        const rendered = mount(stubStore)(<InternalLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                target="_self"
                href={stubProps.href}
                text={stubProps.serviceName}
                className={`link--${stubProps.serviceType}`}
            />
        );
    });

    Object.keys(internalLinks)
        .filter(key => !["default", "InternalLink"].includes(key))
        .forEach(key => {
        describe(key, function () {
            it("renders", function () {
                const specificInternalLink = internalLinks[key];
                const rendered = mount(stubStore)(specificInternalLink());

                expect(rendered).to.be.ok;
                expect(rendered).to.have.length(1);

                const link = rendered;
                expect(link).to.be.ok;
                expect(link).to.have.length(1);
                expect(link).to.have.prop("serviceType");
                expect(link).to.have.prop("serviceName");
                expect(link).to.have.prop("href");
            });
        });
    });
});
