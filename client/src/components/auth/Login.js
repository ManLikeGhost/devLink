import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ setAlert, login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if ( email === '' && password === '' && password.length < 6 ) {
			setAlert( 'Fill the required feilds', 'danger' );
		} else {
			login( email, password );
		}
		console.log('Success');
	};

	// redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	}
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign into your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						// required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						// minLength='6'
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign up</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ( {
	isAuthenticated: state.auth.isAuthenticated
} );
export default connect(mapStateToProps, { setAlert, login })(Login);
