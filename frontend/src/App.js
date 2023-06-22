import logo from './logo.svg';
import './App.scss';
import TerminalViewer from './TerminalViewer'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TerminalForm from './Components/TerminalForm'
import AppMenu from './Components/AppMenu'
import TerminalList from './Components/TerminalList'
import Login from './Components/LoginForm'
import Signup from './Components/SignupForm'
import ThemedStyles from './TerminalComponents/ThemedStyles'
import AltInput from './TerminalComponents/AltInput'
import LineInput from './TerminalComponents/LineInput'
import MotherServer from './TerminalComponents/MotherServer'
import MotherClient from './TerminalComponents/MotherClient'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/testing2" element={<Testing2 />} />
          <Route path="/terminals" element={<Editor />} />
          <Route path="/viewer/:name" element={<TerminalViewer />} />
        </Routes>
      </Router>
    </Provider>
  );
};

const Home = () => {
  return (
    <div className="App">
      <AppMenu />
      <h1>LoFi Computer Systems</h1>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </div>
  )
};

const LoginPage = () => {
  return (
    <div>
      <AppMenu />
      <Login />
    </div>
  )
}

const SignupPage = () => {
  return (
    <div>
      <AppMenu />
      <Signup />
    </div>
  )
}

const Editor = () => {
  return (
    <div>
      <AppMenu />
      <TerminalForm />
      <TerminalList />
    </div>
  )
};
  
const Testing = () => {
  return (
    <div className="App">
      <AppMenu />
      <MotherServer/>
    </div>
  )
};

const Testing2 = () => {
  return (
    <div className="App">
      <AppMenu />
      <MotherClient/>
    </div>
  )
};

export default App;