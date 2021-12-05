import React from 'react';
import propTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
	education: { school, degree, feildofstudy, current, to, from, description },
}) => {
	return (
		<div>
			<h3 class='text-dark'>{school}</h3>
			<p>
				<Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
				{!to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p>Sep 1993 - June 1999</p>
            <p><strong>Degree: </strong>{ degree }</p>
            <p><strong>Field Of Study: </strong>{feildofstudy}</p>
            <p>
              <strong>Description: </strong>{description}.
            </p>
		</div>
	);
};

ProfileEducation.propTypes = {
	experience: propTypes.object.isRequired,
};

export default ProfileEducation;
