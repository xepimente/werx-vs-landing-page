import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import InvalidRestaurant from "./components/InvalidRestaurant";
import ReviewPage from "./components/ReviewPage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Payment from "./components/Payment";

function App() {
  const [authToken, setAuthToken] = useState(null);
 

  useEffect(()=> {
    // const authToken = Cookies.get("voter");
    const authToken = localStorage.getItem("voter");
    if (authToken) {
      // Decode the JWT token to get its expiration time
      const decodedToken = jwtDecode(authToken);

      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, remove it from localStorage
        localStorage.removeItem("voter");
        setAuthToken(null);
      } else {
        // Token is valid, set it as authToken
        setAuthToken(authToken);
      }
    }
  },[])


  return (
    <Router>
      <Routes>
        {!authToken && (
          <Route path="/" element={<Navigate to="/invalid-restaurant" />} />
        )}
        <Route path="/invalid-restaurant" element={<InvalidRestaurant />} />
        <Route path="/voters-registration/:id" element={<RegistrationPage />} />
        {authToken && (
          <Route path="/review-product/:id" element={<ReviewPage />} />
        )}
        <Route path="*" element={<InvalidRestaurant />} />
        {/* <Route path="/*" element={<Payment />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
