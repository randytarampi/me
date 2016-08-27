import {Drawer} from 'react-mdl';
import Navigation from './navigation';

export default () =>
	<Drawer className="drawer" title={<strong>Find me:</strong>}>
		<Navigation />
	</Drawer>;