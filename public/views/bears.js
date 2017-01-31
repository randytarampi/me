import {Grid, Cell} from "react-mdl";
import Bear from "../components/bear";

export default () =>
	<Grid id="intro" className="block">
		<Cell className="block__bear" col={5} hideTablet={true} hidePhone={true}>
			<Bear />
		</Cell>
		<Cell className="block__text" col={7} tablet={8}>
			<h2>
				<span className="text">And the Bears?</span>
			</h2>
			<p>
				<span className="text">Well, there was this co-op student, and then I got tasked with internationalization... If you <em>really</em> want to know, get in touch and I'll come up with some coherent and appropriate explanation, depending entirely on who you introduce yourself as.</span>
			</p>
			<p>
				<span className="text">Try not to bonk them on the nose, they're not big fans of that.</span>
			</p>
		</Cell>
	</Grid>;