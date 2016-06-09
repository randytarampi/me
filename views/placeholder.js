import {Grid, Cell} from "react-mdl";
import {HelloBear} from "./bear";

export default ({name}) =>
	<Grid className="cage">
		<Cell col={3} tablet={2} hidePhone={true}/>
		<Cell col={6} tablet={4} phone={4}>
			<HelloBear />
		</Cell>
		<Cell col={3} tablet={2} hidePhone={true}/>
	</Grid>;