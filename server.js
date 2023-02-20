const express =require('express');
const cors=require('cors');
const {v4:uuidv4}=require('uuid');
const stripe=require('stripe')('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')

const app=express();
app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('welcome to our ecommerce store!')
})

app.post('/checkout',async(req,res)=>{
    let error;
    let status;
    try{

        const {cart,token}=req.body;
        const customer= await stripe.customers.create({
            email:token.email,
            source:token.id,
        });
        const key=uuidv4();
        const charge=await stripe.paymentIntents.create({
            amount:cart.totalPrice*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:'products description here!',
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }

        },{idempotencyKey:key})
        status='success'
        // console.log(status);
    }catch(e){
        console.log(e)
        status='error'
    }
    res.json({status}); 
})

app.listen(8080,()=>{
    console.log('your app is running on port 8080');
})

