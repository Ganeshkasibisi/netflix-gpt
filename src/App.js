
import Body from './components/Body.js'
import appStore from './utils/appStore.js';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
      <Body/>
      </Provider>
    </div>
  );
}

export default App;
