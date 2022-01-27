import React, { Fragment, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostIem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	
	return loading ? (
		<Spinner />
	) : (
		<Fragment class='container'>
			<h1 class='large text-primary'>Posts</h1>
			<p class='lead'>
				<i class='fas fa-user'></i> Welcome to the community!
			</p>

			<PostForm />
			<div class='posts'>
				{posts.map((post) => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts: propTypes.func.isRequired,
	post: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
