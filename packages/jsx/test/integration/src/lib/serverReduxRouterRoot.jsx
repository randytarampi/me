import {logger} from "@randy.tarampi/browser-logger";
import {expect} from "chai";
import {createBrowserHistory} from "history";
import React from "react";
import {Provider} from "react-redux";
import * as reactRouter from "react-router-config";
import sinon from "sinon";
import {ConnectedErrorWrapper} from "../../../../src/lib/containers/error";
import reducers from "../../../../src/lib/data/reducers";
import {ServerReduxRouterRoot} from "../../../../src/lib/serverReduxRouterRoot";
import configureStore from "../../../../src/lib/store/configureStore";
import {mount} from "../../../../src/test/util";

describe("ServerReduxRouterRoot", function () {
    let stubInitialState;
    let stubStore;
    let stubHistory;
    let stubRoutes;

    beforeEach(function () {
        const testComponent = () => <div className="testing">
            Testing...
        </div>;

        stubHistory = createBrowserHistory();
        stubStore = configureStore(stubInitialState, stubHistory, reducers);
        stubRoutes = [
            {
                component: testComponent,
                path: "/"
            }
        ];

        sinon.spy(reactRouter, "renderRoutes");
        sinon.spy(logger, "info");
        sinon.spy(logger, "warn");
    });

    afterEach(function () {
        reactRouter.renderRoutes.restore();
        logger.info.restore();
        logger.warn.restore();
    });

    it("renders", function () {
        const stubProps = {
            woof: "meow"
        };
        const rendered = mount(stubStore)(<ServerReduxRouterRoot {...stubProps} store={stubStore} history={stubHistory}
                                                                 routes={stubRoutes}/>);

        expect(rendered).to.have.descendants(Provider);
        expect(rendered.find(Provider)).to.have.prop("store", stubStore);
        expect(rendered).to.have.descendants(ConnectedErrorWrapper);
        expect(rendered.find(ConnectedErrorWrapper)).to.have.props(stubProps);
        expect(rendered).to.have.descendants(stubRoutes[0].component);

        // FIXME-RT: Uncomment these lines when we figure out how to make the entire component render properly
        //expect(reactRouter.renderRoutes.calledOnce).to.eql(true);
        //sinon.assert.calledWith(reactRouter.renderRoutes, stubRoutes, sinon.match(stubProps));
    });
});
