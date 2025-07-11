import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postedby: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
