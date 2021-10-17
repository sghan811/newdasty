const Bomments = require("../models/bommentModel");
const Bosts = require("../models/bostModel");

const bommentCtrl = {
  createBomment: async (req, res) => {
    try {
      const { bostId, content, tag, reply, bostUserId } = req.body;

      const bost = await Bosts.findById(bostId);
      if (!bost) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      if (reply) {
        const cm = await Bomments.findById(reply);
        if (!cm) {
          return res.status(400).json({ msg: "Bomment does not exist." });
        }
      }

      const newBomment = new Bomments({
        user: req.user._id,
        content,
        tag,
        reply,
        bostUserId,
        bostId,
      });

      await Bosts.findOneAndUpdate(
        { _id: bostId },
        {
          $push: { bomments: newBomment._id },
        },
        { new: true }
      );

      await newBomment.save();
      res.json({ newBomment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateBomment: async (req, res) => {
    try {
      const { content } = req.body;

      await Bomments.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { content }
      );

      res.json({ msg: "updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  likeBomment: async (req, res) => {
    try {
      const bomment = await Bomments.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (bomment.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already liked this bost" });
      }

      await Bomments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      );

      res.json({ msg: "Bomment liked successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unLikeBomment: async (req, res) => {
    try {
      await Bomments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        }
      );

      res.json({ msg: "Bomment unliked successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteBomment: async (req, res) => {
    try {
      const bomment = await Bomments.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { bostUserId: req.user._id }],
      });

      await Bosts.findOneAndUpdate(
        { _id: bomment.bostId },
        {
          $pull: { bomments: req.params.id },
        }
      );
      res.json({ msg: "Bomment deleted successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = bommentCtrl;
