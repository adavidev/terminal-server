import logo from './logo.svg';
import './App.scss';
import TerminalViewer from './TerminalViewer'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  
  return (
    <Provider store={store}>
      <TerminalViewer />
    </Provider>
  );
}

export default App;