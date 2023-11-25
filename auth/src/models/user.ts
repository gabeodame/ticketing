import mongoose from "mongoose";
import { PasswordManager } from "../services/password-manager";

interface UserAttrs {
  email: string;
  password: string;
}

// User model interface
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// User Document interface
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id, delete ret.password, delete ret.__v;
      },
    },
  }
);

// intercept save and hash password before saving
userSchema.pre("save", async function (done) {
  // check if user password is being modified or is new user, don't want to hash already hased password
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = function (attrs: UserAttrs) {
  return new this(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
