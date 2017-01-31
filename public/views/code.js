import {Grid, Cell} from "react-mdl";
import {DoubtBear} from "../components/bear";
import Link from "../components/link";

export default () =>
	<Grid id="code" className="block">
		<Cell className="block__text" col={7} tablet={8}>
			<h2>
				<span className="text">If you insist on knowing more...</span>
			</h2>
			<p>
				<span className="text">I've built a couple things of note that you might be interested in if you're into software.</span>
			</p>
			<ul>
				<li>
					<span className="text"><Link href="https://github.com/randytarampi/randytarampi.github.io" text="This page" /> you're currently looking at,</span>
				</li>
				<li>
					<span className="text"><Link href="https://github.com/randytarampi/me.photos" text="that Photo blog" /> I was shilling earlier,</span>
				</li>
				<li>
					<span className="text">a <Link href="https://github.com/randytarampi/pseudolocalize.woof" text="string pseudolocalization library"/>, and</span>
				</li>
				<li>
					<span className="text">an <Link href="https://github.com/randytarampi/pseudolocalize.woof" text="image pseudolocalization library" />.</span>
				</li>
			</ul>
		</Cell>
		<Cell className="block__bear" col={5} hideTablet={true} hidePhone={true}>
			<DoubtBear />
		</Cell>
	</Grid>;