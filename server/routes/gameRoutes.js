import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

const allowedStatuses = ["Wishlist", "Planned", "Playing", "Finished"];

router.get("/", async (req, res) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    if (typeof status === "string" && status.length > 0 && status !== "All") {
      if (status.includes(",")) {
        filter.status = { $in: status.split(",").map((s) => s.trim()) };
      } else {
        filter.status = status;
      }
    }

    if (typeof search === "string" && search.trim().length > 0) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }

    const games = await Game.find(filter).sort({ createdAt: -1 });
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch games" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch game" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, platform, status, link } = req.body;

    if (!title || !platform || !status) {
      return res.status(400).json({ message: "title, platform, and status are required" });
    }

    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "status must be Wishlist, Planned, Playing, or Finished" });
    }

    const created = await Game.create({ title, platform, status, link });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Failed to create game" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, platform, status, link } = req.body;

    if (!title || !platform || !status) {
      return res.status(400).json({ message: "title, platform, and status are required" });
    }

    if (!allowedStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "status must be Wishlist, Planned, Playing, or Finished" });
    }

    const updated = await Game.findByIdAndUpdate(
      req.params.id,
      { title, platform, status, link },
      { new: true }
    );


    if (!updated) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update game" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete game" });
  }
});

export default router;
