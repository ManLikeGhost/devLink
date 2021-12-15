import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostIem = ({
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
	return (
		<Fragment>
			<div class='post bg-white p-1 my-1'>
				<div>
					<Link to='/profile'>
						<img class='round-img' src={avatar} alt='' />
						<h4>{name}</h4>
					</Link>
				</div>
				<div>
					<p class='my-1'>{text}</p>
					<p class='post-date'>
						Posted on <Moment format='dd/mm/yyyy'>{date}</Moment>
					</p>
					<button type='button' class='btn btn-light'>
						<i class='fas fa-thumbs-up'></i>
						<span>{likes.length}</span>
					</button>
					<button type='button' class='btn btn-light'>
						<i class='fas fa-thumbs-down'></i>
					</button>
					<Link to={`/post/${_id}`} class='btn btn-primary'>
						Discussion <span class='comment-count'>{comments.length}</span>
					</Link>
					{!auth.loading && user === auth.user._id && (
						<button type='button' class='btn btn-danger'>
							<i class='fas fa-times'></i>
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

PostIem.propTypes = {
	post: propTypes.object.isRequired,
	auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PostIem);
