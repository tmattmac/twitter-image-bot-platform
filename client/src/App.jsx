import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import axios from "axios";
import Navbar from "./components/Navbar";
import useFetch from "./hooks/useFetch";
import BotManager from "./pages/BotManager";
import LandingPage from "./pages/LandingPage";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4)
  }
}));

function App() {
  const [userData, loading, error, retry, setUserData] = useFetch('/auth/isAuthenticated');
  const classes = useStyles();

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post('/auth/logout')
      .then(() => setUserData(null))
      .catch(console.error); // TODO: Handle error properly
  }

  let display;

  if (loading) display = <h1>Loading...</h1>;
  else if (!userData) display = <LandingPage />;
  else display = <BotManager />;

  return (
    <div>
      <CssBaseline />
      <Navbar user={userData?.user} handleLogout={handleLogout} />
      <Container maxWidth="lg" className={classes.container}>
        {display}
      </Container>
    </div>
  )
}

export default App;
