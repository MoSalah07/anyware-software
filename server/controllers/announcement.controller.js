import Announcement from "../models/announcement.model.js";
import { validateObjectId } from "../utils/isValidObjectId.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const getAllAnnouncements = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const announcements = await Announcement.find({}, { __v: 0 })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    if (!announcements.length) {
      return sendError(res, "Announcements not found", 404);
    }

    return sendSuccess(
      res,
      { announcements },
      "Announcements fetched successfully",
      200
    );
  } catch (error) {
    return sendError(res, "Server Error", 500, error.message);
  }
};

export const getSingleAnnouncement = async (req, res) => {
  try {
    validateObjectId(req.params.id, "Announcement ID");

    const announcement = await Announcement.findById(req.params.id).lean();

    if (!announcement) return sendError(res, "Announcement not found", 404);

    return sendSuccess(
      res,
      announcement,
      "Announcement fetched successfully",
      200
    );
  } catch (error) {
    return sendError(
      res,
      error.message.includes("Invalid") ? error.message : "Server Error",
      400,
      error.message
    );
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content, postedby } = req.body;

    if (!title?.trim() || !content?.trim() || !postedby?.trim()) {
      return sendError(res, "All fields are required", 400);
    }

    const newAnnouncement = await Announcement.create({
      title,
      content,
      postedby,
    });

    return sendSuccess(
      res,
      { newAnnouncement },
      "Announcement created successfully",
      201
    );
  } catch (error) {
    return sendError(res, "Server Error", 500, error.message);
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    validateObjectId(req.params.id, "Announcement ID");

    const { title, content, postedby } = req.body;

    if (!title?.trim() || !content?.trim() || !postedby?.trim()) {
      return sendError(res, "All fields are required", 400);
    }

    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, content, postedby },
      { new: true }
    );

    if (!updated) return sendError(res, "Announcement not found", 404);

    return sendSuccess(res, updated, "Announcement updated successfully", 200);
  } catch (error) {
    return sendError(
      res,
      error.message.includes("Invalid") ? error.message : "Server Error",
      400,
      error.message
    );
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    validateObjectId(req.params.id, "Announcement ID");

    const deleted = await Announcement.findByIdAndDelete(req.params.id);

    if (!deleted) return sendError(res, "Announcement not found", 404);

    return sendSuccess(
      res,
      { deleted },
      "Announcement deleted successfully",
      200
    );
  } catch (error) {
    return sendError(
      res,
      error.message.includes("Invalid") ? error.message : "Server Error",
      400,
      error.message
    );
  }
};
