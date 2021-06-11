const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  photo: {
    data: Buffer,
    contentType: String
  },
  about: {
    type: String,
    trim: true
  },
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
  resetPasswordLink: {
    data: String,
    default: ""
},
role: {
  type: String,
  default: "subscriber"
}

});

/**
 * Virtual fields are additional fields for a given model.
 * Their values can be set manually or automatically with defined functionality.
 * Keep in mind: virtual properties (password) don't get persisted in the database.
 * They only exist logically and are not written to the document's collection.
 * Hashed version of the password gets persisted in db.
 */

// ! Virtual field

userSchema
  .virtual("password")
  .set(function (password) {
    // TODO: create temporary variable called _password
    this._password = password;
    // TODO: generate a timestamp to use it as salt using uuid npm package
    this.salt = uuidv1();
    // TODO: encrypt password to generate a hashed_password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// ! method

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },
};

module.exports = mongoose.model("User", userSchema);
