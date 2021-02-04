const express = require('express');
const router = express.Router();
const auth = require( '../../middleware/auth' );
const { check, validationResult } = require( 'express-validator' );
const User = require( '../../models/User' );
const Post = require( '../../models/Post' );
const Profile = require('../../models/Profile');
const { json, request } = require( 'express' );

// @route    POST api/post
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

// @route    GET api/post
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

// @route    GET api/post/:id
// @access   Private
// @desc     Get single post by ID

router.get('/:id', auth, async (req, res) => {
	try {
		const singlePost = await Post.findById(req.params.id);
        
        if ( !singlePost ) {
            return res.status( 404 ).json({msg: 'Post not Found'});
        }
        
        res.json( singlePost );
	} catch (error) {
		console.error(error.message);
        if ( error.kind === 'ObjectId' ) {
            return res.status(404).json({ msg: 'Post not Found' });
        }
        res.status( 500 ).send( 'Server Error' );
	}
} );

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
            return res.status(401).json( {msg: 'Unathorized User'} )       
        }
        await singlePost.remove();
        res.json( { msg:'Post Removed' } );
	} catch (error) {
        console.error( error.message );
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not Found' });
        }
		res.status(500).send('Server Error');
	}
});


module.exports = router;
