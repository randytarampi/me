import {Emoji as EmojiEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import proxyquire from "proxyquire";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import selectors from "../../../../lib/data/selectors";
import {shallow} from "../../../util";

describe("Emoji", function () {
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
    });

    afterEach(function () {
        selectors.getEmoji.restore();
    });

    it("receives default props", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "emoji"};
        const clearEmojiStub = sinon.stub().returns({type: "GRR"});
        const instantiateEmojiStub = sinon.stub().returns({type: "WOOF"});
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredEmoji = proxyquire("../../../../lib/containers/emoji/emoji", {
            "../../actions/emoji/clearEmoji": {
                "default": clearEmojiStub
            },
            "../../actions/emoji/instantiateEmoji": {
                "default": instantiateEmojiStub
            },
            "../../actions/emoji/onComponentClick": {
                "default": onComponentClickStub
            }
        });
        const Emoji = proxyquiredEmoji.default;

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

        expect(clearEmojiStub.notCalled).to.eql(true);
        expect(instantiateEmojiStub.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);
    });

    it("falls back to a given emoji", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};
        const clearEmojiStub = sinon.stub().returns({type: "GRR"});
        const instantiateEmojiStub = sinon.stub().returns({type: "WOOF"});
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredEmoji = proxyquire("../../../../lib/containers/emoji/emoji", {
            "../../actions/emoji/clearEmoji": {
                "default": clearEmojiStub
            },
            "../../actions/emoji/instantiateEmoji": {
                "default": instantiateEmojiStub
            },
            "../../actions/emoji/onComponentClick": {
                "default": onComponentClickStub
            }
        });
        const Emoji = proxyquiredEmoji.default;

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

        expect(clearEmojiStub.notCalled).to.eql(true);
        expect(instantiateEmojiStub.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);
    });

    it("returns a found emoji ", function () {
        const stubProps = {id: "emoji"};
        const clearEmojiStub = sinon.stub().returns({type: "GRR"});
        const instantiateEmojiStub = sinon.stub().returns({type: "WOOF"});
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredEmoji = proxyquire("../../../../lib/containers/emoji/emoji", {
            "../../actions/emoji/clearEmoji": {
                "default": clearEmojiStub
            },
            "../../actions/emoji/instantiateEmoji": {
                "default": instantiateEmojiStub
            },
            "../../actions/emoji/onComponentClick": {
                "default": onComponentClickStub
            }
        });
        const Emoji = proxyquiredEmoji.default;

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

        expect(clearEmojiStub.notCalled).to.eql(true);
        expect(instantiateEmojiStub.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);
    });

    it("dispatches `clearEmojiStub` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};
        const clearEmojiStub = sinon.stub().returns({type: "GRR"});
        const instantiateEmojiStub = sinon.stub().returns({type: "WOOF"});
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredEmoji = proxyquire("../../../../lib/containers/emoji/emoji", {
            "../../actions/emoji/clearEmoji": {
                "default": clearEmojiStub
            },
            "../../actions/emoji/instantiateEmoji": {
                "default": instantiateEmojiStub
            },
            "../../actions/emoji/onComponentClick": {
                "default": onComponentClickStub
            }
        });
        const Emoji = proxyquiredEmoji.default;

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiStub.notCalled).to.eql(true);
        expect(instantiateEmojiStub.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);

        const mappedClearEmoji = rendered.prop("clearEmoji");

        mappedClearEmoji();

        expect(clearEmojiStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(clearEmojiStub, passedEmoji);
    });

    it("dispatches `instantiateEmoji` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};
        const clearEmojiStub = sinon.stub().returns({type: "GRR"});
        const instantiateEmojiStub = sinon.stub().returns({type: "WOOF"});
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredEmoji = proxyquire("../../../../lib/containers/emoji/emoji", {
            "../../actions/emoji/clearEmoji": {
                "default": clearEmojiStub
            },
            "../../actions/emoji/instantiateEmoji": {
                "default": instantiateEmojiStub
            },
            "../../actions/emoji/onComponentClick": {
                "default": onComponentClickStub
            }
        });
        const Emoji = proxyquiredEmoji.default;

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiStub.notCalled).to.eql(true);
        expect(instantiateEmojiStub.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);

        const mappedInstantiateEmoji = rendered.prop("instantiateEmoji");

        mappedInstantiateEmoji();

        expect(instantiateEmojiStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(instantiateEmojiStub, passedEmoji);
    });

    it("dispatches `onComponentClick` properly", function () {
        selectors.getEmoji.restore();
        sinon.stub(selectors, "getEmoji").returns(null);

        const stubProps = {id: "meow", emoji: EmojiEntity.fromJS({id: "meow"})};
        const clearEmojiStub = sinon.stub().returns({type: "GRR"});
        const instantiateEmojiStub = sinon.stub().returns({type: "WOOF"});
        const onComponentClickStub = sinon.stub().returns({type: "MEOW"});
        const proxyquiredEmoji = proxyquire("../../../../lib/containers/emoji/emoji", {
            "../../actions/emoji/clearEmoji": {
                "default": clearEmojiStub
            },
            "../../actions/emoji/instantiateEmoji": {
                "default": instantiateEmojiStub
            },
            "../../actions/emoji/onComponentClick": {
                "default": onComponentClickStub
            }
        });
        const Emoji = proxyquiredEmoji.default;

        const rendered = shallow(stubStore)(<Emoji {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("emoji");

        const passedEmoji = rendered.prop("emoji");
        expect(passedEmoji).to.be.instanceof(EmojiEntity);
        expect(passedEmoji).to.eql(stubProps.emoji);

        expect(clearEmojiStub.notCalled).to.eql(true);
        expect(instantiateEmojiStub.notCalled).to.eql(true);
        expect(onComponentClickStub.notCalled).to.eql(true);

        const mappedOnComponentClick = rendered.prop("onComponentClick");
        const stubComponentId = "grr";
        const stubClickEvent = "rawr";

        mappedOnComponentClick(stubComponentId, stubClickEvent);

        expect(onComponentClickStub.calledOnce).to.eql(true);
        sinon.assert.calledWith(onComponentClickStub, passedEmoji.id, stubComponentId, stubClickEvent);
    });
});
