if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ExpressError = require('./utils/errorhandler');
const MongoDBStore = require("connect-mongo");




// const errorHandler = require('./helper/errorhandler');
const morgan = require('morgan');
const flash = require('connect-flash');


app.use(express.static(__dirname+'/public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





const dbUrl = process.env.DB_URL2||'mongodb://localhost:27017/hack';
mongoose.connect(dbUrl,
    {useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true}
    ).then(()=>{
        console.log("database is connected successfully");
    }).catch((err)=>{
        console.log("database connection is failed");
    });

    const secretkey = process.env.SESSION_SECRET || "secretStuffShouldBeSecret";


    const sessionConfig = {
        store : MongoDBStore.create({
            mongoUrl : dbUrl
        }),
        name: 'session',
        secret:secretkey,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            // secure: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



const User = require('./models/userAuthSchema');

const authRoute = require('./routes/userAuth');





passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    // res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})













app.use('/auth', authRoute);


app.get('/', (req, res)=>{
    if(!req.isAuthenticated())
   {
    return res.render('index');
   }

    else res.redirect('/home');
});
app.get('/home', (req, res)=>{
    if(req.isAuthenticated())
    {res.render('home');}

    else {res.redirect('/');}
})
app.get('/about', async(req, res)=>{
    res.render('about');
});
app.get('/games',(req, res)=>{
    if(req.isAuthenticated())
    res.render('gamehome');

    else res.redirect('/');
});


app.get('/yoga', (req, res)=>{
    if(req.isAuthenticated())
    res.render('yoga');

    else return res.redirect('/');
});

app.get('/story', (req, res)=>{
    if(req.isAuthenticated())
    res.render('story');

    else return res.redirect('/');
});


app.get('/meditation', (req, res)=>{
    if(req.isAuthenticated())
    res.render('meditation');

    else return res.redirect('/');
});

app.get('/profile', async(req, res)=>{
const name = req.user.name;
const email = req.user.email;
const specialization = req.user.specialization;
res.render('Profile',{name : name, email : email, specialization : specialization});
});

app.get('/schedule', async(req, res)=>{
    if(req.isAuthenticated()){
        const users = await User.find({specialization:{ $ne: "" }});
        res.render('scheduleList', {doctors : users});
    }
    else return res.redirect('/home');

});
app.get('/scheduling', (req, res)=>{
    req.flash('success',"Your appointment request has been transfered to doctor and the time will be notified to you by email.");
    res.redirect('/schedule');
})

// app.get('/quiz', async(req, res)=>{
//     if(req.isAuthenticated())
//     res.render('quiz');

//     else return res.redirect('/');
// });
app.get('/logout',(req, res)=>{
    console.log(session);
    req.logout();
    req.flash('success', 'You are successfully logged out');
    res.redirect('/');
 });

app.use((req, res)=>{
 res.render('notfound')
});


app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running");
})
