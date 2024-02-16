const express = require('express')
const colors = require("colors");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const AuthRoute = require('./Routes/AuthRoute')
const MemberRegRoute = require('./Routes/MemberRegistration')
const userRoute = require('./Routes/usersRoute')
const teamRoute = require('./Routes/teamRoute')
const examRoute = require('./Routes/examRoute')

const cors = require("cors");

app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
);


const DBurl = process.env.MONGO_URI;
const options = {
  autoIndex: false, 
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000, 
  family: 4 
};

mongoose.connect(DBurl, options).then(
  () => { console.log(`Successfully conncted to mongoDB database`.cyan.bold); },
  err => { console.log(err) }
);



app.use(express.json());


app.use('/Api/Auth',AuthRoute);
app.use('/Api/AddMember',MemberRegRoute);
app.use('/Api/users',userRoute);
app.use('/Api/teams',teamRoute);
app.use('/Api/exams',examRoute);



app.use("/", (req, res, next) => {
    res.status(404).json("you are in 404 Api route, please redirect to a functional route");
    next();
});
  




let Port = 5000 || process.env.PORT;
app.listen(
  Port || process.env.PORT,
  console.log(`Server is running on port ${Port}...`.yellow.bold)
);

