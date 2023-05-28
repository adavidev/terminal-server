import logo from './logo.svg';
import './App.scss';
import TerminalViewer from './TerminalViewer'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TerminalForm from './Components/TerminalForm'

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/terminals">Terminals</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terminals" element={<TerminalForm />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  return <h1>Welcome to the Home Page!</h1>;
};
  
export default App;