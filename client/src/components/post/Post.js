import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm';
import CommentItem from './CommentItem'


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
				<div className='comments'>
					{post.comments.map( (comment) => (
						
						<CommentItem key={comment._id} comment={comment} postId={post._id}/>
						
					))}
				</div>
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




