import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { Wishlist } from './Wishlist';
import { LoginApp } from './Login'; 
import { Home } from './Home';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
function App() {
  const [SignedInUser, setSignedInUser] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {onAuthStateChanged(auth, (user)=>{
    if(user){
      setSignedInUser(true);
      setUser(user);
    }
    else{
      setSignedInUser(false);
      setUser(null); 
    }
  })}, [])

  if (SignedInUser){
  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/"><Home user={user}/></Route>
        <Route path="/wishlist"><Wishlist user={user}/></Route>
      </Switch>
    </BrowserRouter>

  );
  }
  else{
    return(
      <LoginApp/>
    )
  }
}

export default App;
