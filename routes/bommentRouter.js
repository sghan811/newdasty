const router = require("express").Router();
const auth = require("../middleware/auth");
const bommentCtrl = require("../controllers/bommentCtrl");

router.post("/bomment", auth, bommentCtrl.createBomment);

router.patch("/bomment/:id", auth, bommentCtrl.updateBomment);

router.patch("/bomment/:id/like", auth, bommentCtrl.likeBomment);
router.patch("/bomment/:id/unlike", auth, bommentCtrl.unLikeBomment);
router.delete("/bomment/:id", auth, bommentCtrl.deleteBomment);

module.exports = router;
