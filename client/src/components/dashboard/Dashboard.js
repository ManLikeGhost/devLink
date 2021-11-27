import React, { Fragment, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 class='large text-primary'>Dashboard</h1>
			<p class='lead'>
				<i class='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
				</Fragment>
			) : (
				<Fragment>
					<p>You are yet to setup a profile, please add some info.</p>
					<Link to='/create-profile' className='btn btn-primary my-1 '>
						Create profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	profile: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
