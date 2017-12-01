
//Applications
import SansTypo from 'SansTypo/Source/1.0.0/Applications/SansTypo';
import AppTitle from 'SansTypo/Source/1.0.0/Components/General/AppTitle';

// navigation could auto add, but this isn't goint to navigate, so we'll leave it neutered
const Title = new AppTitle();
Title.addTo(document.body);

// applications auto add themselves
const App = new SansTypo();

export default App;
