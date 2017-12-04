const firebase = require("firebase");
const crypto = require('crypto');

const config = {
    apiKey: "AIzaSyAHQoqo4N4Bv0LHjipRmoNwIer1owu1VO8",
    authDomain: "react-wiki-9d4cb.firebaseapp.com",
    databaseURL: "https://react-wiki-9d4cb.firebaseio.com",
    projectId: "react-wiki-9d4cb",
    storageBucket: "react-wiki-9d4cb.appspot.com",
    messagingSenderId: "143687244983"
};

firebase.initializeApp(config);

const database = firebase.database();

function hash(password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}

const router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
    resave: false,
    saveUninitialized: true,
    secret: 'oneteam2014'
}));

router.post('/api/signup', function(request, response) {
    let username = request.body.username,
        password = request.body.password;

    if (!username || !password)
        return response.json({
            signedIn: false,
            message: 'No username or password'
        });

    database.ref('users/' + username).once('value')
        .then(function(snapshot) {
            if (snapshot.exists())
                return response.json({
                    signedIn: false,
                    message: 'Username already in use'
                });

            let userObj = {
                username: username,
                passwordHash: hash(password)
            };

            console.log(snapshot);

            // let newPostRef = firebase.database().ref('users/' + userId).push();
            // newPostRef.set({
            //     // ...
            // });

            // database.ref('users/').set(userObj);
        });

    // users.child(username).once('value', function(snapshot) {
        // if (snapshot.exists())
        //     return response.json({
        //         signedIn: false,
        //         message: 'Username already in use'
        //     });

        // let userObj = {
        //     username: username,
        //     passwordHash: hash(password)
        // };

        // users.child(username).set(userObj);
        // request.session.user = userObj;
        //
        // response.json({
        //    signedIn: true,
        //    user: userObj
        // });
    // });
});

// router.post('/api/signin', function(request, response) {
//     let username = request.body.username,
//         password = request.body.password;
//
//     if (!username || !password)
//         return response.json({
//             signedIn: false,
//             message: 'No username or password'
//         });
//
//     users.child(username).once('value', function(snapshot) {
//         if (!snapshot.exists() || snapshot.child('passwordHash'.val() !== hash(password)))
//             return response.json({
//                 signedIn: false,
//                 message: 'Wrong username or password'
//             });
//
//         let user = snapshot.exportVal();
//
//         request.session.user = user;
//
//         response.json({
//             signedIn: true,
//             user: user
//         });
//     });
// });
//
// router.post('/api/signout', function(request, response) {
//     delete request.session.user;
//
//     response.json({
//         signedIn: false,
//         message: 'You have been signed out'
//     });
// });

module.exports = router;
