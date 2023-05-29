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
        <Link to="/viewer">Viewer</Link>
      </li>
    </ul>
  </nav>
)