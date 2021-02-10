const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const { json, request } = require('express');

// @route    POST api/post
// @access   Private
// @desc     Create a post
router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();

			res.json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}

		const user = await User.findById(req.user.id).select('-password');
		const newPost = {
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id,
		};
	}
);

// @route    GET api/post
// @access   Private
// @desc     Get all post

router.get('/', auth, async (req, res) => {
	try {
		const post = await Post.find().sort({ date: -1 });
		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/post/:id
// @access   Private
// @desc     Get single post by ID

router.get('/:id', auth, async (req, res) => {
	try {
		const singlePost = await Post.findById(req.params.id);

		if (!singlePost) {
			return res.status(404).json({ msg: 'Post not Found' });
		}

		res.json(singlePost);
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not Found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/post/:id
// @access   Private
// @desc     Delete single post by ID

router.delete('/:id', auth, async (req, res) => {
	try {
		const singlePost = await Post.findById(req.params.id);

		if (!singlePost) {
			return res.status(404).json({ msg: 'Post not Found' });
		}
		//Check who the user is
		if (singlePost.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unathorized User' });
		}
		await singlePost.remove();
		res.json({ msg: 'Post Removed' });
	} catch (error) {
		console.error(error.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not Found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/post/like/:id
// @access   Private
// @desc     Like a single post

router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if post has already been liked
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length >0
		) {
			return res
				.status(400)
				.json({ msg: `Post already liked by ${req.user.id}` });
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
} );

// @route    PUT api/post/unlike/:id
// @access   Private
// @desc     Unlike a single post

router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if post has already been liked
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length === 0
		) {
			return res
				.status(400)
				.json({ msg: 'Post has not yet been liked' });
		}

		//Get remove index 
        const removeIndex = post.likes.map( like => like.user.toString() ).indexOf( req.user.id );

        post.likes.splice(removeIndex, 1);


		await post.save();

		res.json(post.likes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
} );

// @route    POST api/post/comment/:id
// @access   Private
// @desc     Create a comment on a post
router.post(
	'/comment/:id',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
            
            const post = await Post.findById( req.params.id );
            
			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
            };
            
            post.comments.unshift(newComment);

			await post.save();

			res.json(post.comments);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}

	}
);

//  @route      DELETE api/post/comment/:id/:comment_id
//  @desc       Delete comment
//  @access     Private
router.delete( '/comment/:id/:comment_id', auth, async ( req, res ) => {
    try {
			const post = await Post.findById(req.params.id);

			// Pull out comment
			const comment = post.comments.find(
				(comment) => comment.id === req.params.comment_id
			);

			// Make sure comment exists
			if (!comment) {
				return res.status(404).json({ msg: 'Comment no dey boss' });
			}

			// Check User
			if (comment.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'Unauthorized User' });
			}

			//Get remove index
			const removeIndex = post.comments
				.map((comment) => comment.user.toString())
				.indexOf(req.user.id);

			post.comments.splice(removeIndex, 1);

			await post.save();

			res.json(post.comments);
		} catch (error) {
        console.error(error.message);
		res.status(500).send('Server Error');
    }



} );



module.exports = router;
