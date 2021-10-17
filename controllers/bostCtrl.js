const Bosts = require("../models/bostModel");
const Bomments = require("../models/bommentModel");
const Users = require("../models/userModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const bostCtrl = {
  createBost: async (req, res) => {
    try {
      const {
        content,
        contentsub,
        community,
        images,
        images2 /*added images2, title*/,
      } = req.body;

      // if (images.length === 0) {
      //   return res.status(400).json({ msg: "Please add photo(s)" });
      // }

      const newBost = new Bosts({
        content,
        contentsub,
        community,
        images,
        images2, //added part
        user: req.user._id,
      });
      await newBost.save();

      res.json({
        msg: "Bost created successfully.",
        newBost: {
          ...newBost._doc,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getBosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Bosts.find({
          // user: [...req.user.following, req.user._id],
        }),
        req.query
      ).paginating();
      const bosts = await features.query
        .sort("-createdAt")
        .populate(
          "user likes likelefts likerights",
          "avatar username fullname followers"
        )
        .populate({
          path: "bomments",
          populate: {
            path: "user likes likelefts likerights ",
            select: "-password",
          },
        });

      res.json({
        msg: "Success",
        result: bosts.length,
        bosts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllBosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Bosts.find({
          // user: [...req.user.following, req.user._id],
        }),
        req.query
      ).paginating();
      const bosts = await features.query
        .sort("-createdAt")
        .populate(
          "user likes likelefts likerights",
          "avatar username fullname followers"
        )
        .populate({
          path: "bomments",
          populate: {
            path: "user likes likelefts likerights ",
            select: "-password",
          },
        });

      res.json({
        msg: "Success",
        result: bosts.length,
        bosts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateBost: async (req, res) => {
    try {
      const { content, contentsub, community, images } = req.body;

      const bost = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          content,
          contentsub,
          community,
          images,
          images2,
        }
      )
        .populate("user likes likelefts likerights", "avatar username fullname")
        .populate({
          path: "bomments",
          populate: {
            path: "user likes likelefts likerights",
            select: "-password",
          },
        });

      res.json({
        msg: "Bost updated successfully.",
        newBost: {
          ...bost._doc,
          content,
          contentsub,
          community,
          images,
          images2,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  likeBost: async (req, res) => {
    try {
      const bost = await Bosts.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (bost.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already liked this bost" });
      }

      const like = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!like) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ msg: "Bost liked successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unLikeBost: async (req, res) => {
    try {
      const like = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!like) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ msg: "Bost unliked successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  likeleftBost: async (req, res) => {
    try {
      const bost = await Bosts.find({
        _id: req.params.id,
        likelefts: req.user._id,
      });
      if (bost.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already likeleftd this bost" });
      }

      const likeleft = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likelefts: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!likeleft) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ msg: "Bost likeleftd successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unLikeleftBost: async (req, res) => {
    try {
      const likeleft = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likelefts: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!likeleft) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ msg: "Bost unlikeleftd successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  likerightBost: async (req, res) => {
    try {
      const bost = await Bosts.find({
        _id: req.params.id,
        likerights: req.user._id,
      });
      if (bost.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already likerightd this bost" });
      }

      const likeright = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likerights: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!likeright) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ msg: "Bost likerightd successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unLikerightBost: async (req, res) => {
    try {
      const likeright = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likerights: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!likeright) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ msg: "Bost unlikerightd successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserBosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Bosts.find({ user: req.params.id }),
        req.query
      ).paginating();
      const bosts = await features.query.sort("-createdAt");

      res.json({
        bosts,
        result: bosts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getBost: async (req, res) => {
    try {
      const bost = await Bosts.findById(req.params.id)
        .populate("user likes likelefts", "avatar username fullname followers")
        .populate({
          path: "bomments",
          populate: {
            path: "user likes likelefts ",
            select: "-password",
          },
        });

      if (!bost) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ bost });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getBostDiscover: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 8;

      const bosts = await Bosts.aggregate([
        { $match: { user: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
      ]);

      res.json({
        msg: "Success",
        result: bosts.length,
        bosts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteBost: async (req, res) => {
    try {
      const bost = await Bosts.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      await Bomments.deleteMany({ _id: { $in: bost.bomments } });

      res.json({
        msg: "Bost deleted successfully.",
        newBost: {
          ...bost,
          user: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  reportBost: async (req, res) => {
    try {
      const bost = await Bosts.find({
        _id: req.params.id,
        reports: req.user._id,
      });
      if (bost.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already reported this bost" });
      }

      const report = await Bosts.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { reports: req.user._id },
        },
        {
          new: true,
        }
      );

      if (!report) {
        return res.status(400).json({ msg: "Bost does not exist." });
      }

      res.json({ msg: "Bost reported successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  saveBost: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.user._id,
        saved: req.params.id,
      });
      if (user.length > 0) {
        return res
          .status(400)
          .json({ msg: "You have already saved this bost." });
      }

      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { saved: req.params.id },
        },
        {
          new: true,
        }
      );

      if (!save) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      res.json({ msg: "Bost saved successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unSaveBost: async (req, res) => {
    try {
      const save = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { saved: req.params.id },
        },
        {
          new: true,
        }
      );

      if (!save) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      res.json({ msg: "Bost removed from collection successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSaveBost: async (req, res) => {
    try {
      const features = new APIfeatures(
        Bosts.find({ _id: { $in: req.user.saved } }),
        req.query
      ).paginating();

      const saveBosts = await features.query.sort("-createdAt");

      res.json({
        saveBosts,
        result: saveBosts.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = bostCtrl;
