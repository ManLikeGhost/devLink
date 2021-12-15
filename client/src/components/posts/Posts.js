import React, { Fragment, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostIem';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	const onSubmit = (e) => {
		e.preventDefault();
	};
	return loading ? (
		<Spinner />
	) : (
		<Fragment class='container'>
			<h1 class='large text-primary'>Posts</h1>
			<p class='lead'>
				<i class='fas fa-user'></i> Welcome to the community!
			</p>

			<div class='post-form'>
				<div class='bg-primary p'>
					<h3>Say Something...</h3>
				</div>
				<form class='form my-1'>
					<textarea
						name='text'
						cols='30'
						rows='5'
						placeholder='Create a post'
						required
					></textarea>
					<input type='submit' class='btn btn-dark my-1' value='Submit' />
				</form>
			</div>

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
