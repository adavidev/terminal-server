import logo from './logo.svg';
import './App.scss';
import TerminalViewer from './TerminalViewer'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TerminalForm from './Components/TerminalForm'
import AppMenu from './Components/AppMenu'
import TerminalList from './Components/TerminalList'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terminals" element={<Editor />} />
          <Route path="/viewer/:name" element={<TerminalViewer />} />
        </Routes>
      </Router>
    </Provider>
  );
};

const Home = () => {
  return (
    <div>
      <AppMenu />
      <h1>Welcome to the Home Page!</h1>
    </div>
  )
};

const Editor = () => {
  return (
    <div>
      <AppMenu />
      <TerminalForm />
      <TerminalList />
    </div>
  )
};
  
export default App;