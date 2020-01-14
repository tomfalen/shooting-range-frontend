import React, { useState, useContext, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Spinner from './spinner';
import authContext from '../store';
// import attemptLogin from '../auth/fakeAuth';
import Axios from 'axios';
import AuthService from '../auth/authService';

const RegisterForm = () => {
          const [ loading, setLoading ] = useState(false);
          const [ formData, setFormData ] = useState({
              username: '',
              password: '',
              FirstName: '',
              LastName: '',
              GunPermissionNumber: '',
              GunPermissionPublisher: '',
              PerceptorIdentityNumber: '',
              PerceptorIdentityPublisher: '',
              Email: ''
          });
          const [ { isLoggedIn, error }, dispatch ] = useContext(authContext);

          function onSubmit(event) {
              event.preventDefault();
              setLoading(true);
            Axios.post("http://sokres.ddns.net:50101/customer/register", {
              "FirstName": formData.FirstName,
              "LastName": formData.LastName,
              "GunPermissionNumber": formData.GunPermissionNumber,
              "GunPermissionPublisher": formData.GunPermissionPublisher,
              "PerceptorIdentityNumber": formData.PerceptorIdentityNumber,
              "PerceptorIdentityPublisher": formData.PerceptorIdentityPublisher,
              "Username": formData.username,
              "Email": formData.Email,
              "Password": formData.password,
              }, 
              {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                  }
              }).then((response) => {
                  console.log(response)
                      dispatch({
                          type: 'REGISTER',
                          payload: {
                            response
                          }
                      });
                  })
                  .catch((error) => {
                      console.log(error);
                      dispatch({
                          type: 'REGISTER_ERROR',
                          payload: {
                          }
                      });
                  })
                  .finally(() => {
                      setLoading(false);
                  });
          }
      
          function onChange(event) {
              const { name, value } = event.target;
              setFormData((formData) => ({
                  ...formData,
                  [name]: value
              }));
          }
      
          return (
              <Fragment>
                  {isLoggedIn ? (
                      <Redirect to="/" />
                  ) : (
                      <Fragment>
                          {error && <p className="error">{error}</p>}
                          <form onSubmit={onSubmit}>
                              <input
                                  type="text"
                                  name="username"
                                  value={formData.username}
                                  onChange={onChange}
                                  placeholder="Username"
                              />
                              <input
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={onChange}
                              />
                            <input
                                  type="text"
                                  name="Email"
                                  value={formData.Email}
                                  onChange={onChange}
                                  placeholder="Email"
                              />
                            <input
                                  type="text"
                                  name="FirstName"
                                  value={formData.FirstName}
                                  onChange={onChange}
                                  placeholder="FirstName"
                              />
                            <input
                                  type="text"
                                  name="LastName"
                                  value={formData.LastName}
                                  onChange={onChange}
                                  placeholder="LastName"
                              />
                            <input
                                  type="text"
                                  name="GunPermissionNumber"
                                  value={formData.GunPermissionNumber}
                                  onChange={onChange}
                                  placeholder="GunPermissionNumber"
                              />
                            <input
                                  type="text"
                                  name="GunPermissionPublisher"
                                  value={formData.GunPermissionPublisher}
                                  onChange={onChange}
                                  placeholder="GunPermissionPublisher"
                              />
                             <input
                                  type="text"
                                  name="PerceptorIdentityNumber"
                                  value={formData.PerceptorIdentityNumber}
                                  onChange={onChange}
                                  placeholder="PerceptorIdentityNumber"
                              />
                            <input
                                  type="text"
                                  name="PerceptorIdentityPublisher"
                                  value={formData.PerceptorIdentityPublisher}
                                  onChange={onChange}
                                  placeholder="PerceptorIdentityPublisher"
                              />
                              <button type="submit" disabled={loading}>
                                  {!!loading && <Spinner width="15px" />}
                                  <span>{!!loading ? 'Please wait' : 'Register'}</span>
                              </button>
                          </form>
                      </Fragment>
                  )}
              </Fragment>
          );
      };
      
export default RegisterForm;