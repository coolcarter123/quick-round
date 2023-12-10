import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import SignUp from './pages/Sign-up/Sign-up';
import LogIn from './pages/log-in/Log-in';
import Lobby from './pages/Lobby/Lobby'


function App() {
  return (<>
    <main className='container'>

      <Routes>
         
        <Route path='/' element={<Home />} />
        <Route path='/sign-up/' element={<SignUp />} />
        <Route path='/log-in/' element={<LogIn />} />
        <Route path='/lobby/' element={<Lobby />} />

      </Routes>
    </main>
  </>);
}

export default App;