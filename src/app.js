const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const port=process.env.PORT||3000

const app=express()


const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


 //to set handlebars and views
app.set('view engine','hbs')   
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Prince',
        name: 'Weather App'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{

    })
})

app.get('/help',(req,res)=>{
    res.render('help')
})

app.get('/contact',(req,res)=>{
    res.send('Contact details')
})


app.get('*',(req,res)=>{
    res.send('404!')
})

 geocode(req.query.address,(error,{latitude,longitude,location})=>{
     if(error){
         return res.send({error})
     }

     forecast(latitude,longitude,(error,forecast)=>{
        if(error){
            req.send({error})
        }
        
     })
 })

app.listen(port,()=>{
    console.log('Server is runnig on Port 3000')
});