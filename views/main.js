import {Layout} from "react-mdl";
import Header from "./header";
import Drawer from './drawer';
import Content from "./content";

export default () =>
	<Layout fixedHeader className="layout">
		<Header />
		<Drawer />
		<Content />
	</Layout>;