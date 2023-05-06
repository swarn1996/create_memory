import { Container } from "@material-ui/core";

import { Routes , Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
  
  return (
    <GoogleOAuthProvider clientId="602865463159-mulrgtinhh0if33vokrde02gpjbl81ft.apps.googleusercontent.com" >
    <Container maxWidth="lg">
      <Navbar /> 
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      </Routes>
    
      {/* <Home />  */}
    </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
