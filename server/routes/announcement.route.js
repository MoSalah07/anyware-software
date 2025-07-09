import express from "express";
import {
  getAllAnnouncements,
  getSingleAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.get("/all-announcement", getAllAnnouncements);
router.get("/single-announcement/:id", getSingleAnnouncement);
router.post("/create-announcement", createAnnouncement);
router.delete("/delete-announcement/:id", deleteAnnouncement);
router.put("/update-announcement/:id", updateAnnouncement);

export default router;
