import Announcement from "../models/announcement.model.js";
import mongoose from "mongoose";

export const getAllAnnouncements = async (_, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const announcements = await Announcement.find({}, { __v: false })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    if (!announcements || announcements.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Announcements not found" });
    }

    res.status(201).json({
      success: true,
      data: { announcements },
      message: "Announcements fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getSingleAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid announcement ID",
      });
    }

    const announcement = await Announcement.findById(id).lean();

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: announcement,
      message: "Announcement fetched successfully",
    });
  } catch (err) {
    console.error("Get Single Announcement Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, postedby } = req.body || {};

    if (!title?.trim() || !content?.trim() || !postedby?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newAnnouncement = await Announcement.create({
      title,
      content,
      postedby,
    });

    res.status(201).json({
      success: true,
      data: { newAnnouncement },
      message: "Announcement created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid announcement ID",
      });
    }

    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.status(201).json({
      success: true,
      data: { deletedAnnouncement },
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, postedby } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid announcement ID",
      });
    }

    if (!title?.trim() || !content?.trim() || !postedby?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        content: content.trim(),
        postedby: postedby.trim(),
      },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedAnnouncement,
      message: "Announcement updated successfully",
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
