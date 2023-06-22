import { Link } from 'react-router-dom';
export default () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/terminals">Terminals</Link>
      </li>
      <li>
        <Link to="/login">Log In</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
      <li>
        <Link to="/testing">Testing</Link>
      </li>
      <li>
        <Link to="/testing2">Testing2</Link>
      </li>
    </ul>
  </nav>
)