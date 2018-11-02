import {Emoji as EmojiEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as clearEmojiAction from "../../../../../../src/lib/actions/emoji/clearEmoji";
import * as instantiateEmojiAction from "../../../../../../src/lib/actions/emoji/instantiateEmoji";
import * as onComponentClickAction from "../../../../../../src/lib/actions/emoji/onComponentClick";
import Emoji from "../../../../../../src/lib/containers/emoji";
import selectors from "../../../../../../src/lib/data/selectors";
import {shallow} from "../../../../../util";

describe("ConnectedEmoji", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubEmoji;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        stubEmoji = EmojiEntity.fromJS({id: "woof"});

        sinon.stub(selectors, "getEmoji").returns(stubEmoji);
        sinon.stub(clearEmojiAction, "clearEmojiCreator").returns({type: "GRR"});
        sinon.stub(instantiateEmojiAction, "instantiateEmojiCreator").returns({type: "WOOF"});
        sinon.stub(onComponentClickAction, "onComponentClickCreator").returns({type: "MEOW"});
    });

    afterEach(function () {
        selectors.getEmoji.restore();
        clearEmojiAction.clearEmojiCreator.restore();
        instantiateEmojiAction.instantiateEmojiCreator.restore();
        onComponentClickAction.onComponentClickCreator.restore();
    });

    it("receives default props", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "emoji"};

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const defaultEmoji = rendered.prop("emoji");
        expect(defaultEmoji).to.be.instanceof(EmojiEntity);
        expect(defaultEmoji.id).to.eql(stubProps.id);

        expect(selectors.getEmoji.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getEmoji, stubInitialState, stubProps.id);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);
    });

    it("falls back to a given emoji", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(selectors.getEmoji.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getEmoji, stubInitialState, stubProps.id);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);
    });

    it("returns a found emoji ", function () {
        const stubProps = {id: "emoji"};

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const foundEmoji = rendered.prop("emoji");
        expect(foundEmoji).to.be.instanceof(EmojiEntity);
        expect(foundEmoji).to.eql(stubEmoji);

        expect(selectors.getEmoji.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getEmoji, stubInitialState, stubProps.id);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);
    });

    it("dispatches `clearEmojiAction.clearEmojiCreator` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};
        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);

        const mappedClearEmoji = rendered.prop("clearEmoji");

        mappedClearEmoji();

        expect(clearEmojiAction.clearEmojiCreator.calledOnce).to.eql(true);
        sinon.assert.calledWith(clearEmojiAction.clearEmojiCreator, passedEmoji);
    });

    it("dispatches passed `clearEmojiAction.clearEmojiCreator` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const clearEmojiCreatorStub = sinon.stub().returns({type: "MEOW"});
        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"}), clearEmoji: clearEmojiCreatorStub};
        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(clearEmojiCreatorStub.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);

        const mappedClearEmoji = rendered.prop("clearEmoji");

        mappedClearEmoji();

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(clearEmojiCreatorStub.calledOnce).to.eql(true);
    });

    it("dispatches `instantiateEmoji` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);

        const mappedInstantiateEmoji = rendered.prop("instantiateEmoji");

        mappedInstantiateEmoji();

        expect(instantiateEmojiAction.instantiateEmojiCreator.calledOnce).to.eql(true);
        sinon.assert.calledWith(instantiateEmojiAction.instantiateEmojiCreator, passedEmoji);
    });

    it("dispatches passed`instantiateEmoji` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const instantiateEmojiCreatorStub = sinon.stub().returns({type: "MEOW"});
        const stubProps = {
            id: "meow",
            emoji: EmojiEntity.fromJS({id: "meow"}),
            instantiateEmoji: instantiateEmojiCreatorStub
        };

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiCreatorStub.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);

        const mappedInstantiateEmoji = rendered.prop("instantiateEmoji");

        mappedInstantiateEmoji();

        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiCreatorStub.calledOnce).to.eql(true);
    });

    it("dispatches `onComponentClick` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);

        const mappedOnComponentClick = rendered.prop("onComponentClick");
        const stubComponentId = "grr";
        const stubClickEvent = "rawr";

        mappedOnComponentClick(stubComponentId, stubClickEvent);

        expect(onComponentClickAction.onComponentClickCreator.calledOnce).to.eql(true);
        sinon.assert.calledWith(onComponentClickAction.onComponentClickCreator, passedEmoji.id, stubComponentId, stubClickEvent);
    });

    it("dispatches passed `onComponentClick` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"}), onComponentClick: onComponentClickStub};

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiAction.clearEmojiCreator.notCalled).to.eql(true);
        expect(instantiateEmojiAction.instantiateEmojiCreator.notCalled).to.eql(true);
        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);

        const mappedOnComponentClick = rendered.prop("onComponentClick");
        const stubComponentId = "grr";
        const stubClickEvent = "rawr";

        mappedOnComponentClick(stubComponentId, stubClickEvent);

        expect(onComponentClickAction.onComponentClickCreator.notCalled).to.eql(true);
        expect(onComponentClickStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(onComponentClickStub, stubComponentId, stubClickEvent);
    });
});
