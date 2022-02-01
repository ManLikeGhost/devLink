import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
const PostIem = ({
	addLike,
	removeLike,
	auth,
	deletePost,
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
	return (
		<Fragment>
			<div className='post bg-white p-1 my-1'>
				<div>
					<Link to={`/profile/${user}`}>
						<img className='round-img' src={avatar} alt='' />
						<h4>{name}</h4>
					</Link>
				</div>
				<div>
					<p className='my-1'>{text}</p>
					<p className='post-date'>
						Posted on <Moment format='dd/mm/yyyy'>{date}</Moment>
					</p>
					<button
						onClick={(e) => addLike(_id)}
						type='button'
						className='btn btn-light'
					>
						<i className='fas fa-thumbs-up'></i>
						<span>{likes.length}</span>
					</button>
					<button
						onClick={(e) => removeLike(_id)}
						type='button'
						className='btn btn-light'
					>
						<i className='fas fa-thumbs-down'></i>
					</button>
					<Link to={`/post/${_id}`} className='btn btn-primary'>
						Discussion <span className='comment-count'>{comments.length}</span>
					</Link>
					{!auth.loading && user === auth.user._id && (
						<button
							onClick={(e) => deletePost(_id)}
							type='button'
							className='btn btn-danger'
						>
							<i className='fas fa-times'></i>
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
	addLike: propTypes.func.isRequired,
	removeLike: propTypes.func.isRequired,
	deletePost: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostIem
);
