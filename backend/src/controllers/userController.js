

export const userController = async (req, res) => {
    console.log("I am hit from the frontend dashboard", req.email);
    
    if(!req.email){
        res.status(401).send("Access denied...No token provided...");
    }
    else{
        res.status(200).send({
            email: req.email
        });
    }
}