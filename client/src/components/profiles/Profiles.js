import React, { Fragment, useEffect } from 'react';
import propTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getAllProfiles();
	}, [getAllProfiles]);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					{' '}
					<h1 class='large text-primary'>Developers</h1>
					<p class='lead'>
						<i class='fab fa-connectdevelop'></i> Browse and connect with
						developers
					</p>
					<div class='profiles'>
                            {profiles.length > 0 ? (
                                profiles.map( profile => (
                                    <ProfileItem key={profile._id} profile={profile}/>
                            ))) : (<h4>No Profiles found!!</h4>) }
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getAllProfiles: propTypes.func.isRequired,
	profile: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
