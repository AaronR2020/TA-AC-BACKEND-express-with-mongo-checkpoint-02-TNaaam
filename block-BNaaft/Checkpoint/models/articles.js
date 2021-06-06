const { Mongoose, Schema } = require("mongoose");
Schema=Mongoose.Schema;
articleSchema=new Schema({
    title:String,
    summary:String,
    host:String,
    start_date:Number,
    end_date:Number,
    location:Number,
    comments:[
        {
        type:Schema.Types.ObjectId,
        ref:'Comments',
        require:true,
        }
    ]
});

module.exports=Mongoose.model('Article',productSchema);
