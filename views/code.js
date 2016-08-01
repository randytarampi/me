import {Grid, Cell} from "react-mdl";
import {DoubtBear} from "../components/bear";
import Link from "../components/link";

export default ({name}) =>
	<Grid id="code" className="block" shadow={0}>
		<Cell className="block__text" col={6} tablet={8} shadow={0}>
			<h2>
				If you insist on knowing more...
			</h2>
			<p>
				I've built a couple things of note that you might be interested in if you're into software.
			</p>
			<ul>
				<li><Link href="https://github.com/randytarampi/randytarampi.github.io" text="This page" /> you're currently looking at,</li>
				<li>a <Link href="https://github.com/randytarampi/pseudolocalize.woof" text="string pseudolocalization library"/>, and</li>
				<li>an <Link href="https://github.com/randytarampi/pseudolocalize.woof" text="image pseudolocalization library" />.</li>
			</ul>
		</Cell>
		<Cell className="block__bear" col={6} tablet={8} hideTablet={true} hidePhone={true}>
			<DoubtBear />
		</Cell>
	</Grid>;