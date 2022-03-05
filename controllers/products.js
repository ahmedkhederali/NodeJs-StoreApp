
const Product=require("../models/product")
const  getAllStaticProducts=async(req,res)=>{
     
    const {name}=req.query
     //const products=await Product.find({}).sort('name -price')
    //  const products=await Product.find({name:{$regex:name,$options:'i'}})
    //const products=await Product.find({name:{$regex:name,$options:'i'}}).sort('name').limit(10).skip(2)
    const products=await Product.find({price:{$gt:30}})
     res.status(200).json({products,nbHits:products.length})
}
const getAllProducts=async(req,res)=>{
    const{featured,company,name,sort,fields,numericFilters}=req.query
    const queryObject={}
    if(featured){
        queryObject.featured=featured==='true'?true:false;
    }
    if(company){
        queryObject.company=company;
    }
    if(name){
        queryObject.name= {$regex:name,$options:'i'};
    }

    //ثابت علشان يحول العلامات ذي الاكبر من والاصغر من الي 
    // $gt $gte  المانجو تفهمهااا
    //applaying only on numbers 
    if(numericFilters){
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(regEx,(match) =>`-${operatorMap[match]}-`);
    const options=['price','rating']; // دول اللي هيطبق عليهم لانهم اعداد 
    filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
    let result= Product.find(queryObject)
    //Sort
    if(sort){
        const sortList=sort.split(',').join(' ');
        result.sort(sortList)
    }else{
        //علشان لو مدخلشي اي شي ارتب بناء اعليه فاقوم انا مرتب بناء علي الوقت اللي اتخزن فيه 
        result.sort('createdAt')
    }
    //Select
    if(fields){
        const filedList=fields.split(',').join(' ');
        result.select(filedList)
    }
    //Limits and this style in the real life 
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 10
    const skip=(page-1)*limit
    result=result.skip(skip).limit(limit)

    const products=await result
    res.json({products,nbHits:products.length})
}


module.exports={getAllProducts,getAllStaticProducts}