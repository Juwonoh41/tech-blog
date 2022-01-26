const router = require('express').Router();
const { Post } = require('../../models');

router.post('/createPost', async (req,res)=> { 
  try { 
      
    let newPost = { 
      ...req.body, 
      blogger_id: req.session.user_id
    }

    let newPostData = await Blog.create(newPost)
      res.json({ newPostData, message: 'Post Created!' });

} catch (err) {
  res.status(400).json(err);
}
})

router.delete('/deletePost', async (req,res)=>{
    await Post.destroy({
      where:{
        id: req.body.postId,
      }
    })
    res.json({message:"Deleted"})
})

router.get('/getpost/:id', async (req,res)=>{
  let blogData= await Post.findByPk(req.params.id)
  res.json(await blogData.get({plain:true}))
})

router.put('/editPost', async (req,res)=> { 
  try { 

    let updatePost = await Post.update({
      title:req.body.title, 
      content: req.body.content
    }, {where:{id:req.body.id}})


      res.json({ newPostData: updatePost, message: 'Post Created!' });

} catch (err) {
  res.status(400).json(err);
}
})

module.exports = router