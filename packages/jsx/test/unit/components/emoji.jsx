import {Emoji as EmojiEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import {Map} from "immutable";
import React from "react";
import sinon from "sinon";
import Emoji from "../../../lib/components/emoji";

describe("Emoji", function () {
    it("renders (persistentEmoji with htmlId and no children)", function () {
        const stubProps = {
            id: "woof",
            htmlId: "meow",
            location: Map({
                pathname: "grr"
            }),
            textEffect: false,
            persistentEmoji: true,
            redirectionTimeout: 1,
            instantiateEmoji: sinon.stub(),
            clearEmoji: sinon.stub(),
            onComponentClick: sinon.stub(),
            emoji: EmojiEntity.fromJS({id: "ʕ•ᴥ•ʔ"})
        };
        const rendered = shallow(<Emoji {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.htmlId);
        expect(rendered).to.have.className(stubProps.emoji.type);
        expect(rendered).to.have.className(`${stubProps.emoji.type}--${stubProps.emoji.toString()}`);
        expect(rendered).to.not.have.descendants(".text");
        // expect(rendered).to.not.have.descendants(`.${stubProps.emoji.type}__children.${stubProps.emoji.type}__children--${stubProps.emoji.toString()}`); // FIXME-RT: Enzyme can't parse this classname, but for some reason it can parse the one above? Something weird af.

        expect(stubProps.instantiateEmoji.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubProps.instantiateEmoji, stubProps.emoji);

        rendered.unmount();
        expect(stubProps.clearEmoji.notCalled).to.eql(true);
    });

    it("renders (!persistentEmoji with no htmlId and children)", function () {
        const stubProps = {
            id: "woof",
            htmlId: "meow",
            location: Map({
                pathname: "grr"
            }),
            textEffect: false,
            persistentEmoji: false,
            redirectionTimeout: 1,
            instantiateEmoji: sinon.stub(),
            clearEmoji: sinon.stub(),
            onComponentClick: sinon.stub(),
            emoji: EmojiEntity.fromJS({id: "ʕ•ᴥ•ʔ"})
        };
        const stubChildren = <span id="woof-child">Woof</span>;
        const rendered = shallow(<Emoji {...stubProps}>{stubChildren}</Emoji>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.htmlId);
        expect(rendered).to.have.className(stubProps.emoji.type);
        expect(rendered).to.have.className(`${stubProps.emoji.type}--${stubProps.emoji.toString()}`);
        expect(rendered).to.not.have.descendants(".text");
        // expect(rendered).to.have.descendants(`.${stubProps.emoji.type}__children.${stubProps.emoji.type}__children--${stubProps.emoji.toString()}`); // FIXME-RT: Enzyme can't parse this classname, but for some reason it can parse the one above? Something weird af.
        expect(rendered).to.have.descendants("#woof-child");

        expect(stubProps.instantiateEmoji.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubProps.instantiateEmoji, stubProps.emoji);

        rendered.unmount();
        expect(stubProps.clearEmoji.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubProps.clearEmoji, stubProps.emoji);
    });

    xit("renders (textEffect)", function () {
        const stubProps = {
            id: "woof",
            htmlId: "meow",
            location: Map({
                pathname: "grr"
            }),
            textEffect: true,
            persistentEmoji: false,
            redirectionTimeout: 1,
            instantiateEmoji: sinon.stub(),
            clearEmoji: sinon.stub(),
            onComponentClick: sinon.stub(),
            emoji: EmojiEntity.fromJS({id: "ʕ•ᴥ•ʔ"})
        };
        const stubChildren = <span id="woof-child">Woof</span>;
        const rendered = shallow(<Emoji {...stubProps}>{stubChildren}</Emoji>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.htmlId);
        expect(rendered).to.have.className(stubProps.emoji.type);
        expect(rendered).to.have.className(`${stubProps.emoji.type}--${stubProps.emoji.toString()}`);
        expect(rendered).to.have.descendants(".text");
    });

    it("renders (components)", function () {
        const stubProps = {
            id: "woof",
            htmlId: "meow",
            location: Map({
                pathname: "grr"
            }),
            textEffect: false,
            persistentEmoji: false,
            redirectionTimeout: 1,
            instantiateEmoji: sinon.stub(),
            clearEmoji: sinon.stub(),
            onComponentClick: sinon.stub(),
            emoji: EmojiEntity.fromJS({id: "ʕ•ᴥ•ʔ"})
        };
        const stubChildren = <span id="woof-child">Woof</span>;
        const rendered = shallow(<Emoji {...stubProps}>{stubChildren}</Emoji>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.htmlId);
        expect(rendered).to.have.className(stubProps.emoji.type);
        expect(rendered).to.have.className(`${stubProps.emoji.type}--${stubProps.emoji.toString()}`);
        expect(rendered).to.not.have.descendants(".text");

        stubProps.emoji.components.forEach(component => {
            const componentSelector = `.${stubProps.emoji.type}__${component.id}`;
            const stubEvent = "woof";
            expect(rendered).to.have.descendants(componentSelector);
            rendered.find(componentSelector).simulate("click", stubEvent);
            sinon.assert.calledWith(stubProps.onComponentClick, component.id, stubEvent);
        });

        expect(stubProps.onComponentClick.callCount).to.eql(stubProps.emoji.components.length);
    });
});
