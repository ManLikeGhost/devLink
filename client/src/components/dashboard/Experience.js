import React, { Fragment } from 'react';
import Moment from 'react-moment';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

const Experience = ({ experience }) => {
	const experiences = experience.map((exp) => (
		<td key={exp._id}>
			<td>{exp.company}</td>
			<td class='hide-sm'>{exp.title}</td>
			<td>
				{' '}
				<Moment format='dd/mm/yyyy'>{exp.from}</Moment> -{' '}
				{exp.to === null ? (
					'Present'
				) : (
					<Moment format='dd/mm/yyyy'>{exp.to}</Moment>
				)}
			</td>
		</td>
	));

	return (
		<Fragment>
			<h2 class='my-2'>Experience Credentials</h2>
			<table class='table'>
				<thead>
					<tr>
						<th>Company</th>
						<th class='hide-sm'>Title</th>
						<th class='hide-sm'>Years</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: propTypes.func.isRequired,
};

export default connect(null)(Experience);
