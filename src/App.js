import React, { useReducer, useState } from 'react';
import './App.css';
import Router from './components/router';
import { Provider } from './store';
import { authReducer, initialAuthState } from './reducers/authReducer';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(7),
  },
}));

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

function App() {
  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();
  Axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    setErrorMessage(error.response.data);
    setHasErrors(true);
    return error;
  });
  const sessionId = localStorage.getItem("sessionId");
  if (sessionId != null) {
    initialAuthState.sessionId = sessionId;
    initialAuthState.IsWorker = localStorage.getItem("isWorker");
    initialAuthState.permissions = localStorage.getItem("permissions");
    initialAuthState.isLoggedIn = true;
  }
  const useAuthState = useReducer(authReducer, initialAuthState);

  return (
    <Provider value={useAuthState}>
      <ThemeProvider theme={theme}>
        <div >
          <Snackbar classes={classes} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={hasErrors} autoHideDuration={6000} onClose={() => setHasErrors(false)}>
            <Alert severity="error">{errorMessage}</Alert>
          </Snackbar>
        </div>
        <Router />
      </ThemeProvider>
    </Provider>
  )
}

// function ChildComponent(){
//   const contextValue = useContext(myContext)
//   return <div>{contextValue}</div>
// }

export default App;
