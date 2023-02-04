import logo from './logo.svg';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/Login' element={<LoginPage/>}/>
  <Route path='/Signup' element={<SignupPage/>}/>
</Routes>
     </Router>
    </div>
  );
}

export default App;
