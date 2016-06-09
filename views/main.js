import {Layout} from "react-mdl";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";

export default ({name}) =>
	<Layout fixedHeader>
		<Header />
		<Content />
		<Footer />
	</Layout>;