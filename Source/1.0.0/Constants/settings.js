
//Constants
import defaults from 'JSUI/Source/1.0.0/Constants/settings';

//Utilities
import env from 'Parcello/environment';
import exports from 'Parcello/exports';

let settings = {
	namespace: 'SansTypo',
	Development: env.dev,
	Production: env.prod,
};

export default settings;

exports(settings).as('SansTypo/Source/1.0.0/Constants/settings');
