import {expect} from "chai";
import {Map} from "immutable/dist/immutable";
import proxyquire from "proxyquire";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import Link from "../../../../../../src/lib/components/link";
import {mount} from "../../../../../../src/test/util";

describe("InternalLink", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let routerPushStub;
    let proxyquiredInternalLinkModule;
    let InternalLink;
    let internalLinks;

    const setInternalLinkModule = () => {
        routerPushStub = sinon.stub().callsFake(payload => {
            return {
                payload,
                type: "woof"
            };
        });

        proxyquiredInternalLinkModule = proxyquire("../../../../../../src/lib/components/link/internal", {
            "connected-react-router/immutable": {
                "push": routerPushStub
            }
        });
        InternalLink = proxyquiredInternalLinkModule.default;
        internalLinks = Object.keys(proxyquiredInternalLinkModule).reduce((actualInternalLinks, internalLinkKey) => {
            if (!["default", "InternalLink"].includes(internalLinkKey)) {
                actualInternalLinks[internalLinkKey] = proxyquiredInternalLinkModule[internalLinkKey];
            }

            return actualInternalLinks;
        }, {});
    };

    setInternalLinkModule();

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

                    expect(rendered).to.have.length(1);

                    const link = rendered;
                    expect(link).to.have.length(1);
                    expect(link).to.have.prop("serviceType");
                    expect(link).to.have.prop("serviceName");
                    expect(link).to.have.prop("href");
                });
            });
        });

    // FIXME-RT: Unignore this test when I figure out how to stub out `routerPushStub` properly
    xit("dispatches `onClick` properly", function () {
        const stubProps = {
            href: "woof",
            serviceName: "meow",
            serviceType: "grr"
        };
        const rendered = mount(stubStore)(<InternalLink {...stubProps}/>);

        expect(rendered).to.containMatchingElement(
            <Link
                target="_self"
                href={stubProps.href}
                text={stubProps.serviceName}
                className={`link--${stubProps.serviceType}`}
            />
        );

        expect(routerPushStub.notCalled).to.eql(true);
        rendered.simulate("click");
        expect(routerPushStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(routerPushStub, stubProps.href);
    });
});
