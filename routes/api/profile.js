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

                //create
                profile = new Profile( profileFeilds );

                await profile.save();
                res.json( profile );
                //add changes to this 
            } catch (error) {
                console.error( error.message );
                res.status( 500 ).send( 'Server Error' );
            }
		}
);

module.exports = router;
