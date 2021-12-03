import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [formData, setformData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) =>
		setformData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addExperience(formData, history);
	};

	return (
		<Fragment>
			<h1 class='large text-primary'>Add An Experience</h1>
			<p class='lead'>
				<i class='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<small>* = required field</small>
			<form class='form' onSubmit={onSubmit}>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* Job Title'
						value={title}
						name='title'
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* Company'
						value={company}
						name='company'
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='Location'
						value={location}
						name='location'
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							checked={current}
							value={current}
							onChange={(e) => {
								setformData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
						/>{' '}
						Current Job
					</p>
				</div>
				<div class='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={(e) => onChange(e)}
						disabled={toDateDisabled ? 'disabled' : ''}
					/>
				</div>
				<div class='form-group'>
					<textarea
						name='description'
						value={description}
						onChange={(e) => onChange(e)}
						cols='30'
						rows='5'
						placeholder='Job Description'
					></textarea>
				</div>
				<input type='submit' class='btn btn-primary my-1' />
				<Link class='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: propTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
