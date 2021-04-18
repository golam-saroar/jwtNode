const express =require('express');
const jwt =require('jsonwebtoken');

const app = express();

app.get('/api', (req,res)=> {
    res.json({
       message: 'Welcome to the APi' 
    })
});



app.post('/api/post', verifyToken, (req,res) => {

    jwt.verify(req.token, 'secretkey', (err, authData)=> {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post created',
                authData
            })
        }
    })

});

app.post('/api/login', (req,res) => {
    
    //Mock user
    const user = {
        id:1,
        userName: 'saroar',
        email: 'golamsaroar89@gmail.com'
    }
    // expires in 30 second
    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token)=> {
        res.json({
                token
            });

    })
});

//Format of Token
// Authorization: Bearer <access_token>

// verify token
function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
app.listen(5000, ()=>{
    console.log('server started 5000');
});