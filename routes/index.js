var express = require('express');
const mongoose = require('mongoose');
const User=require('../model/query');
var swig = require('swig');
var router = express.Router();
var multer=require('multer');
var nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs');
const passport = require('passport');
var multer = require('multer');


DIR = './public/img/'

const storage = multer.diskStorage({
  destination: function(req,file,cb)
  {
    cb(null,DIR)
  },
  filename: function(req,file,cb)
  {
    cb(null,file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }

})

const upload = multer({
  storage: storage
})



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  router.get('/albums-store', function(req, res, next) {
    res.render('albums-store', { title: 'Express' });
  });
  
  router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  router.get('/blog', function(req, res, next) {
    res.render('event', { title: 'Express' });
  });
  router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Express' });
  });
  router.get('/elements', function(req, res, next) {
    res.render('elements', { title: 'Express' });
  });
  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
  });
  router.get('/event', function(req, res, next) {
    res.render('event', { title: 'Express' });
  });
  router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Express' });
  });
  // router.post('/add',upload.single('file'),function(req,res){
  //   // res.redirect('https://www.google.com')
  // //   const _id = new mongoose.Types.ObjectId()
  //   const message=req.body.message
  //   const email=req.body.email
  //   const name=req.body.name
  //   const password=req.body.password
  //   new User({
  //       email:email,
  //       name:name,
  //       message:message,
  //       password:password,
  //       imglink: "img/" + res.req.file.filename
  //     //   _id:_id
  //   }).save(function(err,data){
  //       if(err){
  //           console.log(err)
  //       }
  //       else{
  //           console.log(data)
  //           res.redirect('/')
  //       }
  //   })
  // })

  
  router.get('/elements1',function(req,res)
    {
        User.find(function(err,data)
            {
                if(err){
                        console.log(err);
                    }
                    else{
                        res.render('elements1', { title: 'Express',data:data });
                    }
            }
        )

    }
  )
  router.get('/index1',function(req,res)
    {
        User.find(function(err,data)
            {
                if(err){
                        console.log(err);
                    }
                    else{
                        res.render('index1', { title: 'Express',data:data });
                    }
            }
        )

    }
  )

router.get('/update',function(req,res)
    {
        User.find(function(err,data)
            {
                if(err){
                        console.log(err);
                    }
                    else{
                        res.render('update', { title: 'Express',data:data });
                    }
            }
        )

    }
  )
    


  router.post('/updat/:id', function(req, res, next) {
    const id = req.params.id;
    let UserUpdate = {
            _id:id,
            name : req.body.name,
            email :req.body.email,
            message : req.body.message,
            password : req.body.password
    };

    User.findOneAndUpdate({_id:id},UserUpdate,(err,data)=> 
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                res.redirect('/');
            }
        }
    )
});
 

router.post('/delete/:id', (req, res)=> {

    let id= req.params.id;
    // console.log(_id);

    User.findOneAndRemove({"_id":id},(err,data)=> 
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                res.redirect('/');
            }
        }
    )
});



router.post('/enq', (req, res) => {
  const output = `
    <p>Hi,</p>
    <ul>  
    <li>Name: ${req.body.name}</li>
    </ul>

    <h3>Thankyou for visiting the /h3>

      <li>Email: ${req.body.email}</li>  
    </ul>
    <p>djsajkdjksajk</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'as1996sharma@gmail.com', // generated ethereal user
        pass: '9999871919'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'sweetcute.sharma1@gmail.com', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: 'New Enquiry', // Subject line
      text: 'From Musikii Website', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.send(`<body style="background-color:black; 
        overflow:hidden;">
        <div style="position:absolute; 
        font-family: 'Montserrat';
        width : 100%; 
         height: 5rem; 
         text-align: center;
          font-size: 2rem;
          top: 50%;
          color:silver;
          transform: translateY(-50%);
          ">
          Thank You For The Feedback. We will get in touch with you soon </div></body>`); 
  });
});


// Register
router.post('/add', (req, res) => {
  const  name =req.body.name;
  const email=req.body.email;
  const password=req.body.passport;
  const password2=req.body.password2;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors:errors
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors:errors
          
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


router.post('/login',
      passport.authenticate('music-login'),
      function(req,res)
      {
          res.redirect('/element1')}
      
);



//logout
router.get('/logout',(req,res)=>{
  req.logOut();
  req.flash('success_msg','you are logged out');
  res.redirect('/login');

});




 module.exports = router;