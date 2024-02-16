const Mongoose = require("mongoose");
const userSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 75,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    role: {
      type: String,
      default: 'Member', //Member , Leader
    },
    fullName: {
      type: String,
      required: true,
    },
    //to be continued
    
    teamName:{
      type: String,
      default: '',
    },
    inviteCode:{
        type:String,
        default:''
    },
    stateOfexams:{
        type:String,
        default:'pending'
    },
    chances:{
        type : Number,
        default:3
    }

  },
  { timestamps: true }
);

module.exports = Mongoose.model("User", userSchema);