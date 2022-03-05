const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product Name must provide name'],
        trim:true, // to delete space from start and end,
        maxlength:[20,"Can't be more than 20 character"]
    },
    price:{
        type:Number,
        required:[true,'Product Price must provide name']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        }
    }
})

module.exports = mongoose.model('Product', productSchema)