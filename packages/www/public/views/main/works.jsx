import {DoubtBear} from "@randy.tarampi/js";
import {RowBlock} from "@randy.tarampi/jsx";
import Link, {F00pxLink, FlickrLink, InstagramLink} from "@randy.tarampi/jsx/lib/components/link";
import {Bear} from "@randy.tarampi/jsx/lib/containers/emoji";
import React from "react";
import {Col} from "react-materialize";

const Works = () =>
    <RowBlock name="code">
        <Col className="block__text" l={7} m={8} s={12} offset="m2">
            <h2>
                <span className="text">Still reading eh?</span>
            </h2>
            <p>
                <span className="text">I've built a couple things of note that you might be interested in if you're into software. <Link
                    href="https://github.com/randytarampi/me/tree/master/packages/www#readme" text="This page"/> you're currently looking at, <Link
                    href="https://github.com/randytarampi/me/tree/master/packages/posts#readme" text="that blog"/> I was shilling earlier, a <Link
                    href="https://github.com/randytarampi/pseudolocalize.woof"
                    text="string pseudolocalization library"/> and an <Link
                    href="https://github.com/randytarampi/pseudolocalize.woof" text="image pseudolocalization library"/>.</span>
            </p>
            <p>
                <span className="text">One of those people that's interested in my photography? You'll find my favourite works on <Link
                    href="https://unsplash.com/@randytarampi">Unsplash</Link>. I stopped using <F00pxLink
                    useBranding={false} text="500px"/> ages ago, don't really upload much to <FlickrLink
                    useBranding={false} text="Flickr"/> I was shilling earlier and really only use <InstagramLink
                    useBranding={false} text="Instagram"/> when I'm on the road and shamed into sharing.</span>
            </p>
        </Col>
        <Col className="block__bear hide-on-med-and-down" l={5} s={12}>
            <Bear emoji={DoubtBear.fromJS()} id="code-bear"/>
        </Col>
    </RowBlock>;

export default Works;
