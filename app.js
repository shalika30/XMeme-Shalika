const express=  require('express')
const bodyParser= require('body-parser')
const app=express()
require("./db")
const router = express.Router()
const ejs = require("ejs")
const User = require("./model/User")
const { application } = require('express')
const server=require('http').createServer(app)

const PORT=process.env.PORT || 8081

app.use(bodyParser.json());

//Middleware for handling URL Encoded Bodies
app.use(bodyParser.urlencoded({extended:true}))

//Setting View Engine as EJS
app.set("view engine", "ejs");

//Middleware for Loading Static Files
app.use(express.static(__dirname+'/public'))

//Function to Fetch meme
function fetchMeme(){
    return new Promise((resolve,reject) =>{
        resolve(User.find())
        reject("Some Database error has occured!")
    })
}

//Route to GET /memes
app.get('/memes',function(req,res){
    fetchMeme().then((memeList)=>{
        memeList.reverse();
        let len=memeList.length;
        let sub=0;
        if(len>100)
            sub=len-100;
        memeList.length-=sub;

        var arr=[]
        for(var i=0;i<memeList.length;i++){
            arr[i]={}
            arr[i].id=memeList[i].id;
            arr[i].name=memeList[i].name;
            arr[i].caption=memeList[i].caption;
            arr[i].url=memeList[i].url;

        }

        res.setHeader('Content-Type', 'application/json');
        res.json(arr);
    }).catch((err)=>{
        res.send("Some Error Occured")
        console.log(err);
    })
})

//Routes for a Particular Meme ID
app.get('/memes/:id', (req,res) =>{
    var id=req.params.id
    User.find({"_id":id}).then((data)=>{
        var fetchData={}
        fetchData.id=data[0].id
        fetchData.name=data[0].name
        fetchData.caption=data[0].caption
        fetchData.url=data[0].url

        res.setHeader('Content-Type', 'application/json');
        res.json(fetchData)
    }).catch((err) =>{
        res.sendStatus(404);
    })
})

//Route to POst /memes
app.post('/memes',(req,res) =>{
    var{name,url,caption} = req.body;
    
    const newData = new User({
        name:name,
        caption:caption,
        url:url
    })

    newData.save().then((returnObj) =>{
        res.setHeader('Content-Type', 'application/json');
        res.json({id:returnObj.id})
    }).catch((err) =>{
        res.send("Error Occurred");
        console.log(err)
    })
})

//Routes for Deployment
app.get('/',function(req,res){
    fetchMeme().then((memeList)=>{
        memeList.reverse();
        let len=memeList.length;
        let sub=0;
        if(len>100)
            sub=len-100;
        memeList.length-=sub;
        res.render(__dirname+'/views/index',{data:memeList})
    }).catch((err)=>{
        console.log(err);
    })
})

app.post('/',(req,res) =>{
    var {name,caption,url} = req.body;

    if(!name || !caption || !url) {
        var err="Please fill all the fields!";

        fetchMeme().then((memeList) =>{
            memeList.reverse();
            let len=memeList.length;
            let sub=0;
            if(len>100)
                sub=len-100;
            memeList.length-=sub;
            //console.log(memeList)
            res.render(__dirname+'/views/index',{data:memeList,err:err});
        }).catch((err) =>{
            console.log(err)
        })
    }
    else {
            const memeData = new User({
                name:name,
                caption:caption,
                url:url
            })

            memeData.save().then(()=>{
                console.log("Data Save ho gya")
                fetchMeme().then((memeList) =>{
                    memeList.reverse();
                    let len=memeList.length;
                    let sub=0;
                    if(len>100)
                        sub=len-100;
                    memeList.length-=sub;
                    res.render(__dirname+'/views/index',{data:memeList});
                }).catch((err) =>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
})


server.listen(PORT, ()=>{
    console.log(`Server is running at port no ${PORT}`)
})
