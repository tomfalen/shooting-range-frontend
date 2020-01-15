import React, { useReducer } from 'react';
import './App.css';
import Router from './components/router';
import { Provider } from './store';
import { authReducer, initialAuthState } from './reducers/authReducer';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, indigo } from '@material-ui/core/colors'


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

  const sessionId = localStorage.getItem("sessionId");
  if(sessionId != null){
    initialAuthState.sessionId = sessionId;
    initialAuthState.IsWorker = localStorage.getItem("isWorker");
    initialAuthState.permissions = localStorage.getItem("permissions");
    initialAuthState.isLoggedIn = true;
  }
  const useAuthState = useReducer(authReducer, initialAuthState);

  return (
      <Provider value={useAuthState}>
          <ThemeProvider theme={theme}>
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
