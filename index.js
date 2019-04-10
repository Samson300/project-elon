// ===== BUNDLE OF CONFIGURATIONS======== //
// ======================================//
require('dotenv').config();

const express = require('express'); // Bring in the express library.
//const es6Renderer = require('express-es6-template-engine');

const app = express();   // Create a new express app.

const helmet = require('helmet');
app.use(helmet());

// require my session and session storage modules
// tell express to use the session modules

const session = require('express-session');
// Import the session storage module, and wire it up to the session module.
const FileStore = require('session-file-store')(session);
// tell express to use the session modules
app.use(session({
    store: new FileStore(), // no options for now
    secret: process.env.SESSION_SECRET // connects the session to data in .env (variables owned by the shell)
}));
app.use(express.static('public'))


// const hostname = '127.0.0.1';
const port = process.env.PORT;

//app.engine('html', es6Renderer); 
app.set('view engine', 'html') 
app.set('views', 'views'); // tell express where to find the new files
app.use(express.urlencoded({ extended: true })); // use this middleware! 

// ==========================================//

// ======== PAGE CONTENT ===================//

const User = require('./models/users');
const Space = require('./models/space');
const Comments = require('./models/comments');

app.get('/login', (req, res) => {
    res.render('login-form', {
        locals: {
            email: '',
            message: ''
        }
    });
});

// ADD A USER //
// async function newUser() {
//     const user = await User.getbyEmail('')
//     user.setPassword('password');
//     await user.save();
//     console.log('You added a new user')
// }

// newUser();

const escapeHTML = require('./utils');

// process the new form
app.post('/login', async (req, res) => {
    // Test that the code is working
    console.log('=====================')
    console.log(req.body.email);
    console.log(req.body.password);
    console.log('^^^^^^^^^^^^^^^^^^^^^^')

    const theEmail = escapeHTML(req.body.email);
    const thePassword = escapeHTML(req.body.password);
    const theUser = await User.getbyEmail(theEmail);
    const passwordIsCorrect = theUser.checkPassword(thePassword);

    if (passwordIsCorrect) {
        req.session.user = theUser.id;
        req.session.save(() => {
            res.redirect('/dashboard');
        });
    } else {
        res.render('login-form', {
            locals: {
                email: req.body.email,
                message: 'password is incorrect, please try again!'
            }
        });
    }
});

app.get('/login', (res, req) => {
    res.render('login-form', {
        locals: {
            email: '',
            message: ''
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})