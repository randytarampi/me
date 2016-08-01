import {Drawer} from 'react-mdl';
import Navigation from './navigation';

export default ({name}) =>
	<Drawer className="drawer" title={<strong>Find me:</strong>}>
		<Navigation />
	</Drawer>;