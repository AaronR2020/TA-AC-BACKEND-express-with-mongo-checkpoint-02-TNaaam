const { Mongoose, Schema } = require("mongoose");
Schema=Mongoose.Schema;
commentsSchema=new Schema({
    text:String,
    articleId:{
        type:Schema.Types.ObjectId,
        ref:'Article',
        require:true
    }
});

module.exports=Mongoose.model('Comments',productSchema);
