import React, { Fragment, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';

const Posts = ({ getPosts, post: {posts, loading} }) => {
    useEffect( () => {
        getPosts()
    }, [getPosts]);

	return <div></div>;
};

Posts.propTypes = {
	getPosts: propTypes.func.isRequired,
	post: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Posts);
