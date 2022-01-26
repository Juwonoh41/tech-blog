const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    let logged_in = req.session.logged_in

    let data = await Post.findAll({
      include:[
        {model: User, as :"user"}
      ]
    })

    let serData = data.map(post=> post.get({plain:true}))

   res.render("blog", {data:serData, logged_in})
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/newuser', (req,res)=>{
  
  res.render('newAccount')
})

router.get('/dashboard', withAuth, async (req, res)=>{ 

 let userPosts = await Post.findAll({where:{poster_id:req.session.user_id},include:[
  {model: User, as :"user"}
]})

 let serializedData = userPosts.map(blog=> {
   let history = post.get({plain:true})
   return { ...history, canDelete:true}
  })

  res.render("dashboard", {logged_in: req.session.logged_in, post: serializedData})
})
module.exports = router;
