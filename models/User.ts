import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://pentaxcenter.com/wp-content/uploads/no-user-image-square.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User;
