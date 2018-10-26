import {expect} from "chai";
import {createBrowserHistory} from "history";
import React from "react";
import {Provider} from "react-redux";
import * as reactRouter from "react-router-config";
import sinon from "sinon";
import ErrorWrapper from "../../../../src/lib/containers/errorWrapper";
import reducers from "../../../../src/lib/data/reducers";
import logger from "../../../../src/lib/logger";
import {ServerReduxRouterRoot} from "../../../../src/lib/serverReduxRouterRoot";
import configureStore from "../../../../src/lib/store/configureStore";
import {mount} from "../../../util";

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

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(Provider);
        expect(rendered.find(Provider)).to.have.prop("store", stubStore);
        expect(rendered).to.have.descendants(ErrorWrapper);
        expect(rendered.find(ErrorWrapper)).to.have.props(stubProps);
        expect(rendered).to.have.descendants(stubRoutes[0].component);

        expect(reactRouter.renderRoutes.calledOnce).to.eql(true);
        sinon.assert.calledWith(reactRouter.renderRoutes, stubRoutes, sinon.match(stubProps));
    });
});
