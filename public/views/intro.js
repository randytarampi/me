import {Grid, Cell} from "react-mdl";
import {HelloBear} from "../components/bear";
import {Email, GitHub, LinkedIn, Flickr} from "../components/link";

export default () =>
	<Grid id="intro" className="block">
		<Cell className="block__bear" col={6} tablet={8}>
			<HelloBear />
		</Cell>
		<Cell className="block__text" col={6} tablet={8} shadow={2}>
			<h2>
				Yo. Hi.
			</h2>
			<p>
				Sup? As you can see, there isn't really much to see here yet.
			</p>
			<p>
				Check me out on <GitHub />, try and poach me on <LinkedIn />, send me an <Email text="email"/> if you want to chat, or follow me on <Flickr /> if you want to see some of my photos.
			</p>
		</Cell>
	</Grid>;