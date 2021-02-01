const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route    GET api/profile/me
// @access   Private
// @desc     Get current users profile

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/profile
// @desc     Create or update a users profile
// @access   Private

router.post(
	'/',
	[
		auth,
		[
			check('status', 'status is required').not().isEmpty(),
			check('skills', 'Skills are required').not().isEmpty(),
		],
	],
    async ( req, res ) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const {
				company,
				website,
				location,
				bio,
				status,
				githubusername,
				skills,
				youtube,
				facebook,
				twitter,
				instagram,
				linkedin,
			} = req.body;

			//Build profile object
			const profileFeilds = {};
			profileFeilds.user = req.user.id;
			if (company) profileFeilds.company = company;
			if (website) profileFeilds.website = website;
			if (location) profileFeilds.location = location;
			if (bio) profileFeilds.bio = bio;
			if (status) profileFeilds.status = status;
			if (githubusername) profileFeilds.githubusername = githubusername;
			if (skills) {
				profileFeilds.skills = skills.split(',').map((skill) => skill.trim());
			}

			//Build socialmedia object
            profileFeilds.social = {}
            if ( youtube ) profileFeilds.youtube = youtube;
            if ( facebook ) profileFeilds.facebook = facebook;
            if ( twitter ) profileFeilds.twitter = twitter;
            if ( instagram ) profileFeilds.instagram = instagram;
            if (linkedin) profileFeilds.linkedin = linkedin;
        

			try {
                let profile = await Profile.findOne( { user: req.user.id } );

                if (profile) {
                    //update
                    profile = await Profile.findByIdAndUpdate(
                        { user: req.user.id },
                        { $set: profileFeilds },
                        { new: true }
                    );

                    return res.json( profile );
                }

                //create new profile.
                profile = new Profile( profileFeilds );
                
                await profile.save();
                res.json( profile );
                 
            } catch (error) {
                console.error( error.message );
                res.status( 500 ).send( 'Server Error' );
            }
		}
);

// @route    Get api/profile
// @desc     Get all profiles
// @access   Public
router.get( '/', async ( req, res ) => {
    try {
		const profiles = await Profile.find().populate( 'user', [ 'name', 'avatar' ] );
		res.json( profiles );
	} catch ( error ) {
		console.error( error.message );
		res.status( 500 ).send( 'Server Error' );
	}
} );

// @route    Get api/profile/user/:user_id
// @desc     Get a single user by user ID
// @access   public
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
		
		if ( !profile ) return res.status(400).json({ msg: 'Profile not found' });
		


		res.json( profile );
	} catch (error) {
		console.error( error.message );
		if ( error.kind == 'ObjectId' ) {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server Error');
	}
} );

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete( '/', auth, async ( req, res ) => {
	try {
		//@MUSTDO - remove users post
		// Remove users profile
		await Profile.findOneAndRemove( { user: req.user.id } );
		await User.findOneAndRemove({ _id: req.user.id });
		res.json( { msg: 'User removed' } );
	} catch ( error ) {
		console.error( error.message );
		res.status( 500 ).send( 'Server Error' );
	}
} );

// @route    PUT api/profile/experience
// @desc     Update experience  
// @access   Private
router.put(
	'/experience',
	[
		auth,
		check( 'title', 'Title is required' ).not().isEmpty(),
		check( 'company', 'Company is required' ).not().isEmpty(),
		check( 'from', 'From date is required' ).not().isEmpty(),
	],
	async ( req, res ) => {
		const errors = validationResult( req );
		if ( !errors.isEmpty() ) {
			return res.status( 400 ).json( { errors: error.array() } );
		}

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		} = req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		}

		try {
			const profile = await Profile.findOne( { user: req.user.id } );

			profile.experience.unshift( newExp );
			
			await profile.save();

			res.json( profile );
		} catch (error) {
			console.error( error.message );
			res.status( 500 ).send( 'Server Error' );
		}
	}
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     delete experience  
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		
		//Get index
		const removeIndex = profile.experience.map( item => item.id ).indexOf( req.params.exp_id );
		
		profile.experience.splice( removeIndex, 1 );

		await profile.save()

		res.json( profile );
		//space for changes
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
