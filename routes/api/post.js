const express = require('express');
const router = express.Router();
const auth = require( '../../middleware/auth' );
const { check, validationResult } = require( 'express-validator' );
const User = require( '../../models/User' );
const Post = require( '../../models/Post' );
const Profile = require('../../models/Profile');
const { json } = require( 'express' );

// @route    Post api/post
// @access   Private
// @desc     Create a post
router.post( '/', [ auth, [
    check( 'text', 'Text is required' ).not().isEmpty()
]], async ( req, res ) => {
        const errors = validationResult( req );
        if ( !errors.isEmpty() ) {
            return res.status( 400 ).json( { errors: errors.array() } ); 
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

            res.json( post );
        } catch ( error ) {
            console.error( error.message );
            res.status(500).send('Server Error');
        }

        const user = await User.findById( req.user.id ).select( '-password' );
        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
} );

// @route    Get api/post
// @access   Private
// @desc     Get all post

router.get( '/', auth, async ( req, res ) => {
    try {
        const post = await Post.find().sort( { date: -1 } );
        res.json( post );
    } catch (error) {
        console.error(error.message);
		res.status(500).send('Server Error');
    }
} );

// @route    Get api/post/:id
// @access   Private
// @desc     Get single post by ID

router.get('/:id', auth, async (req, res) => {
	try {
		const singlePost = await Post.findById(req.params.id);
        
        
        res.json( singlePost );
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
