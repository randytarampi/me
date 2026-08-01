import * as api from "@randy.tarampi/jsx/src/lib/data/api.js";
import {expect} from "chai";
import {render} from "@testing-library/react";
import {Map} from "immutable";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import {thunk} from "redux-thunk";
import {createRequire} from "module";
import path from "path";
import * as fetchLetter from "../../../../../src/lib/actions/fetchLetter.js";
import selectors from "../../../../../src/lib/data/selectors.js";

// NOTE-RT: same `require.cache` injection the `fetchLetter` action suite uses. `proxyquire` is not
// a dependency of this monorepo, and this package has no `esmock` either.
const require = createRequire(path.resolve("test/unit/src/lib/containers/letter.jsx"));
const containerPath = require.resolve("../../../../../src/lib/containers/letter.jsx");
const componentPath = require.resolve("../../../../../src/lib/components/letter/index.jsx");

const loadConnectedLetter = LetterComponentStub => {
    delete require.cache[containerPath];
    delete require.cache[componentPath];

    require.cache[componentPath] = {
        id: componentPath,
        filename: componentPath,
        loaded: true,
        exports: {
            __esModule: true,
            default: LetterComponentStub,
            LetterComponent: LetterComponentStub
        }
    };

    return require(containerPath);
};

describe("ConnectedLetter", function () {
    let mockStore;
    let stubStore;
    let stubInitialState;
    let stubLetter;
    let stubIsLoadingUrl;
    let stubIsLoadingUrlSelector;
    let LetterComponentSpy;
    let ConnectedLetter;

    beforeEach(function () {
        mockStore = configureStore([thunk]);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        stubLetter = {woof: true};
        sinon.stub(selectors, "getLetterVariant").returns(stubLetter);
        sinon.stub(fetchLetter, "fetchLetterCreator").returns({type: "MEOW"});
        stubIsLoadingUrl = false;
        stubIsLoadingUrlSelector = sinon.stub().returns(stubIsLoadingUrl);
        sinon.stub(api, "createIsLoadingUrlSelector").returns(stubIsLoadingUrlSelector);

        LetterComponentSpy = sinon.spy(() => <div data-testid="letter-probe" />);
        ({ConnectedLetter} = loadConnectedLetter(LetterComponentSpy));
    });

    afterEach(function () {
        selectors.getLetterVariant.restore();
        fetchLetter.fetchLetterCreator.restore();
        api.createIsLoadingUrlSelector.restore();
    });

    it("maps state and dispatches fetchLetter", function () {
        const rendered = render(<Provider store={stubStore}><ConnectedLetter match={{params: {grr: "rawr"}}} /></Provider>);

        expect(rendered.container.querySelector("[data-testid='letter-probe']")).to.not.eql(null);
        expect(LetterComponentSpy.calledOnce).to.eql(true);

        const props = LetterComponentSpy.firstCall.args[0];
        expect(props.letter).to.eql(stubLetter);
        expect(props.isLoading).to.eql(stubIsLoadingUrl);
        expect(props.variant).to.eql("letter");
        expect(props.fetchLetter).to.be.a("function");

        props.fetchLetter(props.variant);
        expect(fetchLetter.fetchLetterCreator.calledOnce).to.eql(true);
        sinon.assert.calledWith(fetchLetter.fetchLetterCreator, "letter");
    });
});
