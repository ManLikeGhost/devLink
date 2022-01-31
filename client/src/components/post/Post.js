import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm';

const Post = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost]);
	return loading || post === null ? <Spinner/> : (
		<div>
			<section className='container'>
				<Link to='/posts' className='btn'>
					Back To Posts
				</Link>
				<div className='post bg-white p-1 my-1'>
					<div>
						<Link to={`/profile/${post.user}`}>
							<img
								className='round-img'
								src={post.avatar}
								alt=''
							/>
							<h4>{post.name}</h4>
						</Link>
					</div>
					<div>
						<p className='my-1'>
						{post.text}
						</p>
					</div>
				</div>
				<CommentForm postId={post._id} />
				{/* <div className='comments'>
					<div className='post bg-white p-1 my-1'>
						<div>
							<a href='profile.html'>
								<img
									class='round-img'
									src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
									alt=''
								/>
								<h4>John Doe</h4>
							</a>
						</div>
						<div>
							<p class='my-1'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
								possimus corporis sunt necessitatibus! Minus nesciunt soluta
								suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
								dolor? Illo perferendis eveniet cum cupiditate aliquam?
							</p>
							<p class='post-date'>Posted on 04/16/2019</p>
						</div>
					</div>

					<div class='post bg-white p-1 my-1'>
						<div>
							<a href='profile.html'>
								<img
									class='round-img'
									src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
									alt=''
								/>
								<h4>John Doe</h4>
							</a>
						</div>
						<div>
							<p class='my-1'>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
								possimus corporis sunt necessitatibus! Minus nesciunt soluta
								suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
								dolor? Illo perferendis eveniet cum cupiditate aliquam?
							</p>
							<p class='post-date'>Posted on 04/16/2019</p>
							<button type='button' class='btn btn-danger'>
								<i class='fas fa-times'></i>
							</button>
						</div>
					</div>
				</div> */}
			</section>
		</div>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToprops = (state) => ({
	post: state.post,
});

export default connect(mapStateToprops, { getPost })(Post);
