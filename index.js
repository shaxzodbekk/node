const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('vachaappa');

})
.catch((err)=>{
    console.log('xato')
})
const sizeChema = new mongoose.Schema({
    h:Number,
    w:Number,
    uom:String
})
const inventorySchema = new mongoose.Schema({
    item:String,
    qty:Number,
    size:sizeChema,
    status:String
},{collection:'inventory'})
const Inventory = mongoose.model('Inventory',inventorySchema);
async function getInventoryItems1(){
    return await Inventory
    .find({status:'A'})
    .sort({item:1})
    .select({item:1,qty:1,_id:0})
}
async function getInventoryItems2(){
    return await Inventory
    .find()
    .or([{qty:{$lte:50}},{item:/.*l.*/}])
    .sort({qty:-1})
}
async function run(){
    const items=await getInventoryItems2();
    console.log(items);

}
run();
