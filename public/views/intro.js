import {Grid, Cell} from "react-mdl";
import {HelloBear} from "../components/bear";
import {Email, GitHub, LinkedIn, Instagram, Photos} from "../components/link";

export default () =>
	<Grid id="intro" className="block">
		<Cell className="block__bear" col={5} tablet={8}>
			<HelloBear />
		</Cell>
		<Cell className="block__text" col={7} tablet={8}>
			<h2>
				<span className="text">Yo. Hi.</span>
			</h2>
			<p>
				<span className="text">'Sup? As you can see, there isn't really much to see here yet.</span>
			</p>
			<p>
				<span className="text">Check me out on <GitHub />, try and poach me on <LinkedIn />, send me an <Email text="email"/> if you want to chat, or follow me on <Instagram /> if you want to see some of my <Photos />.</span>
			</p>
		</Cell>
	</Grid>;