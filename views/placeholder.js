import {Grid, Cell} from "react-mdl";
import {HelloBear} from "../components/bear";

export default () =>
	<Grid>
		<Cell col={12} tablet={8} phone={4}>
			<HelloBear />
		</Cell>
	</Grid>;