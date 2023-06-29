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
import JournalEntry from './TerminalComponents/JournalEntry'

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
  const text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus nulla sed semper rhoncus. Suspendisse potenti. Aenean sed augue nulla. Duis vel magna eros. Maecenas facilisis vestibulum venenatis. Ut venenatis mattis lacus, at sagittis dui faucibus sed. Aliquam tortor est, varius eget erat sit amet, imperdiet luctus enim. Praesent aliquam pretium eros, vitae pellentesque eros ornare et. Fusce interdum vestibulum sollicitudin. Proin imperdiet facilisis fringilla. Fusce ac sagittis magna. Integer ultricies mauris in est dictum viverra. Morbi ut urna sit amet odio maximus fermentum.

    Aenean id sapien sodales, euismod lacus vitae, congue tortor. Cras quis sagittis nunc, quis blandit justo. Morbi tristique tincidunt libero ornare finibus. Nulla pellentesque orci leo, sed commodo risus hendrerit sed. Maecenas euismod lectus id eros molestie, ut commodo justo rhoncus. Vestibulum suscipit cursus felis elementum semper. Cras eu augue condimentum, rhoncus ipsum vitae, molestie dui. Donec vel ornare arcu.
    
    Nam ac ligula non ligula fringilla fermentum sed eget orci. Proin varius mi lacinia enim convallis, a venenatis orci placerat. Quisque id mi a dolor dapibus sodales. Sed viverra libero non tellus bibendum, ut sodales diam tincidunt. Suspendisse cursus nisl vel fermentum imperdiet. Proin finibus vel mi sit amet euismod. Aliquam euismod cursus ex. Phasellus malesuada libero et ante aliquam laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean fermentum est id elit rhoncus, eget fringilla magna rutrum. Maecenas consequat in turpis ut sollicitudin. Fusce faucibus lacus ac ipsum faucibus finibus. Nulla urna libero, aliquam venenatis lobortis vel, egestas vitae odio.
    
    Sed tempor pellentesque mi, gravida aliquet nisl porta ac. Nam hendrerit felis nec tellus pulvinar gravida. Praesent sodales posuere ipsum id varius. Nullam at convallis urna, at blandit nunc. Proin sed dignissim lacus. Morbi metus elit, sollicitudin eget mollis et, porttitor non velit. Suspendisse id odio sagittis, rutrum arcu ut, molestie erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In maximus felis vitae lectus dapibus, in consequat neque sodales. Praesent rutrum maximus pharetra. Sed et augue tempus, vulputate dolor vel, finibus ante. Suspendisse efficitur rhoncus volutpat. Fusce in sapien eu enim ornare laoreet. Nulla dignissim metus nisi, in vulputate purus gravida nec. Etiam sed felis ut enim ullamcorper eleifend at et arcu. Pellentesque maximus eleifend nulla at efficitur.
    
    In hac habitasse platea dictumst. Nulla facilisi. Suspendisse porttitor congue mauris vitae volutpat. Mauris felis odio, feugiat eu sem sit amet, lacinia feugiat elit. Morbi id nulla accumsan, imperdiet ex ut, luctus leo. Curabitur non vestibulum tellus. Duis malesuada at nunc eget rhoncus. Integer tincidunt, mauris at viverra interdum, neque orci lobortis eros, eu pretium nisl justo dapibus massa. Pellentesque at purus vulputate sapien lacinia aliquet. In tristique ac ex et posuere. Duis iaculis, turpis sed eleifend pulvinar, elit nisi tincidunt justo, sed suscipit nisl urna ac mauris. Duis ultrices elementum mattis.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus nulla sed semper rhoncus. Suspendisse potenti. Aenean sed augue nulla. Duis vel magna eros. Maecenas facilisis vestibulum venenatis. Ut venenatis mattis lacus, at sagittis dui faucibus sed. Aliquam tortor est, varius eget erat sit amet, imperdiet luctus enim. Praesent aliquam pretium eros, vitae pellentesque eros ornare et. Fusce interdum vestibulum sollicitudin. Proin imperdiet facilisis fringilla. Fusce ac sagittis magna. Integer ultricies mauris in est dictum viverra. Morbi ut urna sit amet odio maximus fermentum.

    Aenean id sapien sodales, euismod lacus vitae, congue tortor. Cras quis sagittis nunc, quis blandit justo. Morbi tristique tincidunt libero ornare finibus. Nulla pellentesque orci leo, sed commodo risus hendrerit sed. Maecenas euismod lectus id eros molestie, ut commodo justo rhoncus. Vestibulum suscipit cursus felis elementum semper. Cras eu augue condimentum, rhoncus ipsum vitae, molestie dui. Donec vel ornare arcu.
    
    Nam ac ligula non ligula fringilla fermentum sed eget orci. Proin varius mi lacinia enim convallis, a venenatis orci placerat. Quisque id mi a dolor dapibus sodales. Sed viverra libero non tellus bibendum, ut sodales diam tincidunt. Suspendisse cursus nisl vel fermentum imperdiet. Proin finibus vel mi sit amet euismod. Aliquam euismod cursus ex. Phasellus malesuada libero et ante aliquam laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean fermentum est id elit rhoncus, eget fringilla magna rutrum. Maecenas consequat in turpis ut sollicitudin. Fusce faucibus lacus ac ipsum faucibus finibus. Nulla urna libero, aliquam venenatis lobortis vel, egestas vitae odio.
    
    Sed tempor pellentesque mi, gravida aliquet nisl porta ac. Nam hendrerit felis nec tellus pulvinar gravida. Praesent sodales posuere ipsum id varius. Nullam at convallis urna, at blandit nunc. Proin sed dignissim lacus. Morbi metus elit, sollicitudin eget mollis et, porttitor non velit. Suspendisse id odio sagittis, rutrum arcu ut, molestie erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In maximus felis vitae lectus dapibus, in consequat neque sodales. Praesent rutrum maximus pharetra. Sed et augue tempus, vulputate dolor vel, finibus ante. Suspendisse efficitur rhoncus volutpat. Fusce in sapien eu enim ornare laoreet. Nulla dignissim metus nisi, in vulputate purus gravida nec. Etiam sed felis ut enim ullamcorper eleifend at et arcu. Pellentesque maximus eleifend nulla at efficitur.
    
    In hac habitasse platea dictumst. Nulla facilisi. Suspendisse porttitor congue mauris vitae volutpat. Mauris felis odio, feugiat eu sem sit amet, lacinia feugiat elit. Morbi id nulla accumsan, imperdiet ex ut, luctus leo. Curabitur non vestibulum tellus. Duis malesuada at nunc eget rhoncus. Integer tincidunt, mauris at viverra interdum, neque orci lobortis eros, eu pretium nisl justo dapibus massa. Pellentesque at purus vulputate sapien lacinia aliquet. In tristique ac ex et posuere. Duis iaculis, turpis sed eleifend pulvinar, elit nisi tincidunt justo, sed suscipit nisl urna ac mauris. Duis ultrices elementum mattis.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus nulla sed semper rhoncus. Suspendisse potenti. Aenean sed augue nulla. Duis vel magna eros. Maecenas facilisis vestibulum venenatis. Ut venenatis mattis lacus, at sagittis dui faucibus sed. Aliquam tortor est, varius eget erat sit amet, imperdiet luctus enim. Praesent aliquam pretium eros, vitae pellentesque eros ornare et. Fusce interdum vestibulum sollicitudin. Proin imperdiet facilisis fringilla. Fusce ac sagittis magna. Integer ultricies mauris in est dictum viverra. Morbi ut urna sit amet odio maximus fermentum.

    Aenean id sapien sodales, euismod lacus vitae, congue tortor. Cras quis sagittis nunc, quis blandit justo. Morbi tristique tincidunt libero ornare finibus. Nulla pellentesque orci leo, sed commodo risus hendrerit sed. Maecenas euismod lectus id eros molestie, ut commodo justo rhoncus. Vestibulum suscipit cursus felis elementum semper. Cras eu augue condimentum, rhoncus ipsum vitae, molestie dui. Donec vel ornare arcu.
    
    Nam ac ligula non ligula fringilla fermentum sed eget orci. Proin varius mi lacinia enim convallis, a venenatis orci placerat. Quisque id mi a dolor dapibus sodales. Sed viverra libero non tellus bibendum, ut sodales diam tincidunt. Suspendisse cursus nisl vel fermentum imperdiet. Proin finibus vel mi sit amet euismod. Aliquam euismod cursus ex. Phasellus malesuada libero et ante aliquam laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean fermentum est id elit rhoncus, eget fringilla magna rutrum. Maecenas consequat in turpis ut sollicitudin. Fusce faucibus lacus ac ipsum faucibus finibus. Nulla urna libero, aliquam venenatis lobortis vel, egestas vitae odio.
    
    Sed tempor pellentesque mi, gravida aliquet nisl porta ac. Nam hendrerit felis nec tellus pulvinar gravida. Praesent sodales posuere ipsum id varius. Nullam at convallis urna, at blandit nunc. Proin sed dignissim lacus. Morbi metus elit, sollicitudin eget mollis et, porttitor non velit. Suspendisse id odio sagittis, rutrum arcu ut, molestie erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In maximus felis vitae lectus dapibus, in consequat neque sodales. Praesent rutrum maximus pharetra. Sed et augue tempus, vulputate dolor vel, finibus ante. Suspendisse efficitur rhoncus volutpat. Fusce in sapien eu enim ornare laoreet. Nulla dignissim metus nisi, in vulputate purus gravida nec. Etiam sed felis ut enim ullamcorper eleifend at et arcu. Pellentesque maximus eleifend nulla at efficitur.
    
    In hac habitasse platea dictumst. Nulla facilisi. Suspendisse porttitor congue mauris vitae volutpat. Mauris felis odio, feugiat eu sem sit amet, lacinia feugiat elit. Morbi id nulla accumsan, imperdiet ex ut, luctus leo. Curabitur non vestibulum tellus. Duis malesuada at nunc eget rhoncus. Integer tincidunt, mauris at viverra interdum, neque orci lobortis eros, eu pretium nisl justo dapibus massa. Pellentesque at purus vulputate sapien lacinia aliquet. In tristique ac ex et posuere. Duis iaculis, turpis sed eleifend pulvinar, elit nisi tincidunt justo, sed suscipit nisl urna ac mauris. Duis ultrices elementum mattis.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus nulla sed semper rhoncus. Suspendisse potenti. Aenean sed augue nulla. Duis vel magna eros. Maecenas facilisis vestibulum venenatis. Ut venenatis mattis lacus, at sagittis dui faucibus sed. Aliquam tortor est, varius eget erat sit amet, imperdiet luctus enim. Praesent aliquam pretium eros, vitae pellentesque eros ornare et. Fusce interdum vestibulum sollicitudin. Proin imperdiet facilisis fringilla. Fusce ac sagittis magna. Integer ultricies mauris in est dictum viverra. Morbi ut urna sit amet odio maximus fermentum.

    Aenean id sapien sodales, euismod lacus vitae, congue tortor. Cras quis sagittis nunc, quis blandit justo. Morbi tristique tincidunt libero ornare finibus. Nulla pellentesque orci leo, sed commodo risus hendrerit sed. Maecenas euismod lectus id eros molestie, ut commodo justo rhoncus. Vestibulum suscipit cursus felis elementum semper. Cras eu augue condimentum, rhoncus ipsum vitae, molestie dui. Donec vel ornare arcu.
    
    Nam ac ligula non ligula fringilla fermentum sed eget orci. Proin varius mi lacinia enim convallis, a venenatis orci placerat. Quisque id mi a dolor dapibus sodales. Sed viverra libero non tellus bibendum, ut sodales diam tincidunt. Suspendisse cursus nisl vel fermentum imperdiet. Proin finibus vel mi sit amet euismod. Aliquam euismod cursus ex. Phasellus malesuada libero et ante aliquam laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean fermentum est id elit rhoncus, eget fringilla magna rutrum. Maecenas consequat in turpis ut sollicitudin. Fusce faucibus lacus ac ipsum faucibus finibus. Nulla urna libero, aliquam venenatis lobortis vel, egestas vitae odio.
    
    Sed tempor pellentesque mi, gravida aliquet nisl porta ac. Nam hendrerit felis nec tellus pulvinar gravida. Praesent sodales posuere ipsum id varius. Nullam at convallis urna, at blandit nunc. Proin sed dignissim lacus. Morbi metus elit, sollicitudin eget mollis et, porttitor non velit. Suspendisse id odio sagittis, rutrum arcu ut, molestie erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In maximus felis vitae lectus dapibus, in consequat neque sodales. Praesent rutrum maximus pharetra. Sed et augue tempus, vulputate dolor vel, finibus ante. Suspendisse efficitur rhoncus volutpat. Fusce in sapien eu enim ornare laoreet. Nulla dignissim metus nisi, in vulputate purus gravida nec. Etiam sed felis ut enim ullamcorper eleifend at et arcu. Pellentesque maximus eleifend nulla at efficitur.
    
    In hac habitasse platea dictumst. Nulla facilisi. Suspendisse porttitor congue mauris vitae volutpat. Mauris felis odio, feugiat eu sem sit amet, lacinia feugiat elit. Morbi id nulla accumsan, imperdiet ex ut, luctus leo. Curabitur non vestibulum tellus. Duis malesuada at nunc eget rhoncus. Integer tincidunt, mauris at viverra interdum, neque orci lobortis eros, eu pretium nisl justo dapibus massa. Pellentesque at purus vulputate sapien lacinia aliquet. In tristique ac ex et posuere. Duis iaculis, turpis sed eleifend pulvinar, elit nisi tincidunt justo, sed suscipit nisl urna ac mauris. Duis ultrices elementum mattis.
  `;

  return (
    <div className="App">
      <AppMenu />
      <h1>Text Pagination Example</h1>
      <JournalEntry text={text} pageHeight={window.innerHeight} pageWidth={window.innerWidth} />
      {/* <MotherServer/> */}
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