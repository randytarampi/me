import {Grid, Cell} from "react-mdl";
import Bear from "../components/bear";

export default ({name}) =>
	<Grid id="intro" className="block" shadow={1}>
		<Cell className="block__bear" col={6} tablet={8} hideTablet={true} hidePhone={true}>
			<Bear />
		</Cell>
		<Cell className="block__text" col={6} tablet={8} shadow={2}>
			<h2>
				And the Bears?
			</h2>
			<p>
				Well, there was this co-op student, and then I got tasked with internationalization... If you <em>really</em> want to know, get in touch and I'll come up with some coherent and appropriate explanation, depending entirely on who you introduce yourself as.
			</p>
			<p>
				Try not to bonk them on the nose, they're not big fans of that.
			</p>
		</Cell>
	</Grid>;