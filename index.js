// ===== BUNDLE OF CONFIGURATIONS======== //
// ======================================//
require('dotenv').config();

const express = require('express'); // Bring in the express library.
const es6Renderer = require('express-es6-template-engine');

const bcrypt = require('bcryptjs');

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

app.engine('html', es6Renderer); 
app.set('view engine', 'html') 
app.set('views', 'views'); // tell express where to find the new files
app.use(express.urlencoded({ extended: true })); // use this middleware! 

// ==========================================//

// ======== PAGE CONTENT ===================//

const User = require('./models/users');
const Space = require('./models/space');
const Facts = require('./models/facts');
const Comments = require('./models/old-comment-file');
//console.log('this is my user model', User);

app.get('/login', (req, res) => {
    res.render('login-form', {
        locals: {
            email: '',
            message: ''
        }
    });
});

// ADD A USER //
// async function demo() {
//     const user = await User.getByEmail('j.bergdorff@sparkleapp.com')
//     user.setPassword('password');
//     await user.save();
//     console.log('==================')
//     console.log('You did a thing!')
//     console.log('^^^^^^^^^^^^^^^^^^')
// }

//demo();

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
    const theUser = await User.getByEmail(theEmail);
    console.log('=====================');

    console.log(thePassword);
    console.log('^^^^^^^^^^^^^^^^^^^^^^')
    const passwordIsCorrect = theUser.checkPassword(thePassword);

    if (passwordIsCorrect) {
        req.session.user = theUser.id;
        req.session.save(() => {
            console.log('Did this run?')
            res.redirect('/user');
        });
    } else {
        // console.log(User.setPassword('*****'));
        res.render('login-form', {
            locals: {
                email: req.body.email,
                message: 'Password is incorrect, please try again!'
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
});

// app.get('/dashboard', async (req, res) => {
//     //console.log('GETting the Dashboard')
//     res.render('dashboard')
    
// });
    


app.get('/user', async (req, res) => {
    res.render('user')
});

app.get('/about', async (req, res) => {
    console.log('GETting About Us Page');
    res.render('about');
});

app.get('/map', async (req, res) => {
    console.log('GETting the map')
    res.render('map')
});

app.get('/notifications', async (req, res) => {
    console.log('GETting your notifications');
    res.render('notifications')
});

app.get('/users/:id', async (req, res) => {
    // How to grab a piece out of req.params (or any object):
    // const id = req.params.id;
    // This is known as "destructuring"
    const {id} = req.params;
    const theUser = await User.getById(id);
    res.json(theUser);
});

app.get('/dashboard', async (req, res) => {
    console.log('GETting the Dashboard')
    // grab random facts from the database.
    
    const theFacts = await Facts.getRandom();
    //res.json(theFacts)
    // console.log('======================');
    // //console.log(theFacts);
    // console.log('^^^^^^^^^^^^^^^^^^^^^^');
    //const {fact_id} = req.params;
    const factsById = await Comments.getByFactId(`1`);
    const theComments = await Comments.getAll();
    // console.log('===================')
    // console.log(factsById);
    // console.log('^^^^^^^^^^^^^^^^^^');

    res.render('dashboard', {
        locals: {
            fact: theFacts.id,
            saying: theFacts.saying,
            comments: theComments,
            factsById: factsById.fact_id
        }
    });

    // console.log();
});

app.post('/dashboard', async (req, res) => {
    //console.log(req.body.content);
    let commentData = {
        content: req.body.content,
        user_id: 1
    };
    theComments = await Comments.add(commentData);
    //console.log()
    res.redirect('/dashboard')
})

// app.get('/dashboard/', async (req, res) => {
//     //console.log(req);
    
// } )

setPassword=(newPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    // this.password = hash;
    return hash;
}
// console.log(setPassword('*****', 10));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})