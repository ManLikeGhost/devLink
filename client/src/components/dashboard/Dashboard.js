import React, { Fragment, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
						<DashboardActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />

						<div className="my-2">
							<button className='btn btn-danger' onClick={()=>{deleteAccount()}}> <i className="fas fa-user-minus"></i> Delete Account</button>
						</div>
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
	deleteAccount: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	profile: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
