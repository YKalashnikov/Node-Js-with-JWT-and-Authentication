const router = require("express").Router();
const bcrypt = require('bcrypt');
const User = require("../model/User");
const { registrationValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registrationValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(404).send("Email already exist");

  //Hash 
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Crate a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({user:user._id});
  } catch {
    res.status(404).send(err);
  }
});

//login
router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    //Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("Email is not found");
    //Check password
    const valPassword  = await bcrypt.compare(req.body.password, user.password)
       if(!valPassword) return res.status(404).send('Not invalid password')
       res.send('Log in')
})

module.exports = router;


