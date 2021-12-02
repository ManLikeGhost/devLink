import React, { Fragment } from 'react';
import Moment from 'react-moment';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td class='hide-sm'>{edu.degree}</td>
			<td>
				{' '}
				<Moment format='dd/mm/yyyy'>{edu.from}</Moment> -{' '}
				{edu.to === null ? (
					'Present'
				) : (
					<Moment format='dd/mm/yyyy'>{edu.to}</Moment>
				)}
			</td>
			<td>
				<button onClick={() => {deleteEducation(edu._id)}} className='btn btn-danger'>Delete</button>
			</td>
		</tr>
	));

	return (
		<Fragment>
			<h2 class='my-2'>Education Credentials</h2>
			<table class='table'>
				<thead>
					<tr>
						<th>School</th>
						<th class='hide-sm'>Degree</th>
						<th class='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</table>
		</Fragment>
	);
};

Education.propTypes = {
	education: propTypes.array.isRequired,
	deleteEducation: propTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
