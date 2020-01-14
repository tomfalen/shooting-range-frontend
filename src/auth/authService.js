import React, { useState, useContext, Fragment } from 'react';
import authContext from '../store';
import Axios from 'axios';

export default class AuthService  {

	register = (formData) => {
        const [ { isLoggedIn, error }, dispatch ] = useContext(authContext);
        console.log(formData)
        // Axios.post("http://sokres.ddns.net:50101/customer/register", {
        //       "FirstName": formData.FirstName,
        //       "LastName": formData.LastName,
        //       "GunPermissionNumber": formData.GunPermissionNumber,
        //       "GunPermissionPublisher": formData.GunPermissionPublisher,
        //       "PerceptorIdentityNumber": formData.PerceptorIdentityNumber,
        //       "PerceptorIdentityPublisher": formData.PerceptorIdentityPublisher,
        //       "Username": formData.username,
        //       "Email": formData.Email,
        //       "Password": formData.password,
        //       }, 
        //       {
        //         headers: {
        //             "Accept": "application/json",
        //             "Content-Type": "application/json",
        //           }
        //       }).then((response) => {
        //           console.log(response)
        //               dispatch({
        //                   type: 'REGISTER',
        //                   payload: {
        //                     response
        //                   }
        //               });
        //           })
        //           .catch((error) => {
        //               console.log(error);
        //               dispatch({
        //                   type: 'REGISTER_ERROR',
        //                   payload: {
        //                   }
        //               });
        //           });
          }
		// setTimeout(() => {
		// 	if (formData.username === 'Rohan' && formData.password === 'rohan123' ? true : false) {
		// 		resolve(formData.username);
		// 	} else {
		// 		reject('Username and password is incorrect');
		// 	}
		// }, 1000);
	}