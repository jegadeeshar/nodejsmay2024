const express=require('express')
const mongoose=require('mongoose')
const config = require('config')
const appRoute=require('./routes/approutes')
//express instance
const app=express();
//format
app.use(express.json())

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./docs/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);
//cors
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
})

app.use('/api', appRoute);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

mongoose.connect(config.get('mongodb.url').toString()
).then(result =>{
    app.listen(process.env.PORT || 3200);
}).catch(err =>{
    console.log(err)
})

