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


    //update

    router.put('/:id', (req, res) => {
    
        User.update(req.body, {
          individualHooks: true,
          where: {
            id: req.params.id
          }
        })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });

    //delete

      router.delete('/:id', (req, res) => {
        User.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });
      
      router.post('/logout', (req,res) => {
        if (req.session.loggedIn){
          req.session.destroy(() => {
            res.status(204).end();
          });
        }
        else {
          res.status(404).end();
        }
      });
      
    
module.exports=router;