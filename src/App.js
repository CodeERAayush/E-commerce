import logo from './logo.svg';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom';
import { SignupPage } from './pages/SignupPage';
import NavBar from './components/NavBar';
import { AfterLog } from './pages/AfterLog';
import { AddProducts } from './pages/AddProducts';
import { Cart } from './pages/Cart';
import Profile from './pages/Profile';
import { EditProfile } from './pages/EditProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
<Routes>
  <Route path='/' element={<AfterLog/>}/>
  <Route path='/Login' element={<LoginPage/>}/>
  <Route path='/Signup' element={<SignupPage/>}/>
  <Route path='/AddProd' element={<AddProducts/>}/>
  <Route path='/Cart' element={<Cart/>}/>
  <Route path='/Profile' element={<Profile/>}/>
  <Route path='/Profile/Edit' element={<EditProfile/>}/>
</Routes>
     </Router>
     
    </div>
  );
}

export default App;
