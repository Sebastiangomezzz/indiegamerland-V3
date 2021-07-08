module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    const user = req.session.user
    
    if(user.creator==="No"){
        console.log("Protected!!")
        res.redirect("/private/user")
    }
    next();
};
  