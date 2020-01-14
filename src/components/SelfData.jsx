import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import authContext from '../store';
import Axios from 'axios';

const SelfData = () => {
    const [ { sessionId } ] = useContext(authContext);

    const logOut = () => {
        Axios.post("http://sokres.ddns.net:50101/customer/current", { }, 
              {
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": sessionId
                  }
              }).then((response) => {
                  console.log(response)
                      dispatch({
                          type: 'LOGOUT',
                          payload: {
                            
                          }
                      });
                  })
                  .catch((error) => {
                    console.log(error)
                  })
    };
    return (
        <Fragment>
            <Header>{`Well hello there, ${isLoggedIn ? 'General Kenobi' : 'stranger'}`}</Header>
        </Fragment>
    );
};

export default SelfData;