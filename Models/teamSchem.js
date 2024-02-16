const Mongoose = require("mongoose");

const teamSchema = new Mongoose.Schema(
  {
    teamName : {
        type : String,
        unique: true,
        required : true
    }

  },
  { timestamps: true }
);

module.exports = Mongoose.model("Team", teamSchema);