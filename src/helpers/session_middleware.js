
function authenticateSession(req, res, next) {
    const user = req.session.user;
    if(user != null){
        
        req.user = user;
        next();
        return;
    }
    else{
    res.sendStatus(403);
    return;
    }
}

module.exports = authenticateSession;