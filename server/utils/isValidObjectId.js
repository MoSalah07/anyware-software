import mongoose from "mongoose";

export const validateObjectId = (id, name = "ID") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ${name}`);
  }
};
