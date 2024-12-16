import {User} from '../models/user.models.js'
import bcrypt from 'bcrypt'
import generateToken from '../tokenGeneration/generateToken.js'

export const createUser = async (req, res) => {
    try {
      // Check if all required fields are provided
      const { email, password, name } = req.body;
      if (!email || !password || !name ) {
        return res.status(400).json("All input are  required");
      }
  
      // Check if the user already exists
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).json( "User Already Exist. Please Login");
      }
  
      // Hash the password
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
  
      // Save the user to the database
      const user = await newUser.save();
  
      // Generate a token
      const token = generateToken(email);
  
      // Set the cookie
      res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
        secure: true, // Cookie will only be sent over HTTPS
        httpOnly: true, // Cookie cannot be accessed via client-side scripts
      });
      
      console.log("Cookie set successfully");
      console.log("User is Registred");
    
  
      // Respond with the new user object
      res.status(201).json(user);
    } catch (error) {
      console.error("Got an error", error);
      res.status(500).json("Internal Server Error");
    }
  };