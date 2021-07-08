module.exports = (req, res, next) => {
    // checks if the user/creator try to enter in /index and redirect to their own site
    if (req.session.user) {
      return res.redirect("/private/creator");
      
    }
    next();
};