import React, { useState, useContext, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Spinner from './spinner';
import authContext from '../store';
// import attemptLogin from '../auth/fakeAuth';
import Axios from 'axios';

const LoginForm = () => {
	const [ loading, setLoading ] = useState(false);
	const [ formData, setFormData ] = useState({
		username: '',
		password: ''
	});
	const [ { isLoggedIn, error }, dispatch ] = useContext(authContext);

    
	function onSubmit(event) {
		event.preventDefault();
		setLoading(true);

        Axios.post("http://sokres.ddns.net:50101/user/login", {
            // Login: "testfalenczyk123",
			// Password: "#Test123"
			Login: formData.username,
            Password: formData.password
            }, 
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                  }
		    })
			.then((response) => {
				console.log(response)
				dispatch({
					type: 'LOGIN',
					payload: {
						sessionId: response.data.SessionId,
						IsWorker: response.data.IsWorker,
						permissions: response.data.Permissions
					}
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOGIN_ERROR',
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
						<button type="submit" disabled={loading}>
							{!!loading && <Spinner width="15px" />}
							<span>{!!loading ? 'Please wait' : 'Log In'}</span>
						</button>
					</form>
				</Fragment>
			)}
		</Fragment>
	);
};

export default LoginForm;