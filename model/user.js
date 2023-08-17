const mongoose = require("mongoose");
const { Schema } = mongoose;

//user schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  password: { type: String, required: true, minLength: 6 },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return;
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    required: true,
  },
  token: String,
});

exports.User = mongoose.model("User", userSchema);
