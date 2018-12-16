import {logger} from "@randy.tarampi/browser-logger";
import {expect} from "chai";
import {ConnectedRouter} from "connected-react-router/immutable";
import {createBrowserHistory} from "history";
import {fromJS} from "immutable";
import React from "react";
import {Provider} from "react-redux";
import sinon from "sinon";
import {ClientSwipeableReduxRouterRoot} from "../../../../src/lib/clientSwipeableReduxRouterRoot";
import {ConnectedErrorWrapper} from "../../../../src/lib/containers/error";
import reducers from "../../../../src/lib/data/reducers";
import configureOfflineStore from "../../../../src/lib/store/configureOfflineStore";
import * as renderSwipeableRoutesModule from "../../../../src/lib/util/renderSwipeableRoutes";
import {mount} from "../../../../src/test/util";

describe("ClientSwipeableReduxRouterRoot", function () {
    const globalNavigator = global.navigator;
    let stubInitialState;
    let stubStore;
    let stubHistory;
    let stubRoutes;

    beforeEach(function () {
        stubHistory = createBrowserHistory();
        stubInitialState = fromJS({});
        stubStore = configureOfflineStore(stubInitialState, stubHistory, reducers);
        stubRoutes = [
            {
                component: <div className="testing">
                    Testing...
                </div>,
                path: "/",
                tab: <div>Test Tab</div>
            }
        ];

        sinon.spy(renderSwipeableRoutesModule, "renderSwipeableRoutes");
        sinon.spy(logger, "info");
        sinon.spy(logger, "warn");
    });

    afterEach(function () {
        renderSwipeableRoutesModule.renderSwipeableRoutes.restore();
        logger.info.restore();
        logger.warn.restore();
        global.navigator = Object.assign({}, globalNavigator);
    });

    describe("constructor", function () {
        it("logs a greeting (generic)", function () {
            mount(stubStore)(<ClientSwipeableReduxRouterRoot store={stubStore} history={stubHistory}
                                                             routes={stubRoutes}/>);

            expect(logger.info.callCount).to.eql(4);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            expect(logger.warn.callCount).to.eql(1);
            sinon.assert.calledWith(logger.warn, sinon.match(/If you're a developer and you're reading this message/));
        });

        it("logs a greeting (Firefox)", function () {
            global.navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0";
            mount(stubStore)(<ClientSwipeableReduxRouterRoot store={stubStore} history={stubHistory}
                                                             routes={stubRoutes}/>);

            expect(logger.info.callCount).to.eql(5);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            sinon.assert.calledWith(logger.info, sinon.match(/https:\/\/addons\.mozilla\.org\/en-US\/firefox\/addon\/remotedev/m));
        });

        it("logs a greeting (Chrome)", function () {
            global.navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36";
            mount(stubStore)(<ClientSwipeableReduxRouterRoot store={stubStore} history={stubHistory}
                                                             routes={stubRoutes}/>);

            expect(logger.info.callCount).to.eql(5);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            sinon.assert.calledWith(logger.info, sinon.match(/https:\/\/chrome\.google\.com\/webstore\/detail\/redux-devtools/m));
        });

        it("logs a greeting (IE)", function () {
            global.navigator.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
            mount(stubStore)(<ClientSwipeableReduxRouterRoot store={stubStore} history={stubHistory}
                                                             routes={stubRoutes}/>);

            expect(logger.info.callCount).to.eql(4);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            expect(logger.warn.callCount).to.eql(1);
            sinon.assert.calledWith(logger.warn, sinon.match(/Do yourself a favour and go here before you do anything else:/));
        });
    });

    it("renders", function () {
        const stubProps = {
            woof: "meow"
        };
        const rendered = mount(stubStore)(<ClientSwipeableReduxRouterRoot {...stubProps} store={stubStore}
                                                                          history={stubHistory}
                                                                          routes={stubRoutes}/>);

        expect(rendered).to.have.descendants(Provider);
        expect(rendered.find(Provider)).to.have.prop("store", stubStore);
        expect(rendered).to.have.descendants(ConnectedErrorWrapper);
        expect(rendered.find(ConnectedErrorWrapper)).to.have.props(stubProps);
        expect(rendered).to.have.descendants(ConnectedRouter);
        expect(rendered.find(ConnectedRouter)).to.have.prop("history", stubHistory);

        expect(renderSwipeableRoutesModule.renderSwipeableRoutes.calledOnce).to.eql(true);
        sinon.assert.calledWith(renderSwipeableRoutesModule.renderSwipeableRoutes, stubRoutes, stubProps);
    });
});
