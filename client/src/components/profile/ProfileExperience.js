import React from 'react';
import propTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
	experience: { company, title, location, current, to, from, description },
}) => {
	return (
		<div>
			<h3 class='text-dark'>{company}</h3>
			<p>
				<Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
				{!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
			</p>
		</div>
	);
};

ProfileExperience.propTypes = {
	experience: propTypes.object.isRequired,
};

export default ProfileExperience;
