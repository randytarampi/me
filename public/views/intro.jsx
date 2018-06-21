import React from "react";
import {Col} from "react-materialize";
import {RowBlock} from "me.common.jsx";
import {HelloBear} from "../components/bear";
import {Email, GitHub, Instagram, LinkedIn, Photos} from "../components/link";

const Intro = () =>
	<RowBlock name="intro">
		<Col className="block__bear" l={5} m={8} offset="m2">
			<HelloBear/>
		</Col>
		<Col className="block__text" l={7} m={8}  offset="m2">
			<h2>
				<span className="text">Yo. Hi.</span>
			</h2>
			<p>
				<span className="text">'Sup? As you can see, there isn't really much to see here yet.</span>
			</p>
			<p>
				<span className="text">Check me out on <GitHub/>, try and poach me on <LinkedIn/>, send me an <Email
					text="email"/> if you want to chat, or follow me on <Instagram/> if you want to see some of my <Photos/>.</span>
			</p>
		</Col>
	</RowBlock>;

export default Intro;
