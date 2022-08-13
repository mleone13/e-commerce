const router= require ("express").Router();
const {User} = require ("../../models")

router.post ("/signup" , function (req,res){
User.create (req.body).then (userData => {
    req.session.save (() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedin = true;
        res.json (userData);
    })
}).catch (error => res.json (error))
})

router.post ("/login" , function (req,res){
    User.findOne ({where:{username:req.body.username}}).then (userData => {
        if (!userData) {
            res.status (400).json ({msg:"no user found"})
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status (400).json ({msg:"incorrect password"})
            return;
        }

        req.session.save (() => {
            req.session.userId = userData.id;
            req.session.username = userData.username;
            req.session.loggedin = true;
            res.json ({user:userData, message:"you are now logged in"});
        })
    }).catch (error => res.json (error))
    })

module.exports=router;