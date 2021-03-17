import axios from "axios";
import Navbar from "./components/Navbar";
import useFetch from "./hooks/useFetch";
import { getUserFromResponse } from "./lib/transforms";
import BotManager from "./pages/BotManager";
import LandingPage from "./pages/LandingPage";

function App() {
  const [user, loading, error, _, setUser] = useFetch(
    '/auth/isAuthenticated',
    'GET',
    getUserFromResponse
  );

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post('/auth/logout')
        .then(response => {
            setUser(null);
        })
        .catch(console.error); // TODO: Handle error properly
  }

  let display;

  if (loading) display = <h1>Loading...</h1>;
  else if (!user) display = <LandingPage />;
  else display = <BotManager />;

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      {display}
    </div>
  )
}

export default App;
