var express = require('express');
const comments = require('../models/comments');
var router = express.Router();
Article=require('../models/articles')
Comments=require('../models/comments')

/* GET users listing. */
router.get('/eventForm', function(req, res, next) {
  res.render('eventForm');
}); //done

router.get('/:articleId/eventInfo',(req,res,next)=>{
  id=req.params.articleId;
  //*use this is to search database and output result
  Article.findById(id).populate('comments').exec((e,data)=>{
    if(e)next(e);
    res.render('eventInfo',data);
  });
})//done

router.get('/:articleId/edit',(req,res,next)=>{
  id=req.params.articleId;
  Article.find(id,(e,d)=>{
    if(e)next(e);
    else res.render('editArticle',d);
  })
})//done

router.get('/:articleId/delete',(req,res,next)=>{
  id=req.params.articleId;
  Article.findByIdAndDelete(id,(e,article)=>{
    Comments.findByIdAndDelete(article.comments);
  })
  res.redirect('/')
})//done


router.get('/:articleId/eventInfo', function(req, res, next) {
  id=req.params.articleId;
  //find article by id.
  Article.find(id,(e,d)=>{
    if(e)next(e);
    res.render('eventInfo',d);
  })
});//done

router.post('/:articleId/comment',(req,res)=>{
  id=req.params.articleId;
  //post comment in database
  Comments.create(req.body,(e,d)=>{
    res.rederect(`/events/${id}/eventInfo`);
  })
});//done

router.post('/submitEvent',(req,res)=>{
  id=req.params.articleId;
  //post event in database
  Article.create(req.body,(e,d)=>{
    if(e)next(e);
    else(res.redirect('/'));
  })
});//done

router.post('/:articleId/submitEditEvent',(req,res)=>{
  id=req.params.articleId;
  //update event in database of a pertcluar event
  Article.create(req.body,(`/events/${id}/eventInfo`))
});//done

module.exports = router;
