const router = require("express").Router();
const auth = require("../middleware/auth");
const bostCtrl = require("../controllers/bostCtrl");

router
  .route("/bosts")
  .post(auth, bostCtrl.createBost)
  .get(auth, bostCtrl.getBosts);

router
  .route("/bost/:id")
  .patch(auth, bostCtrl.updateBost)
  .get(auth, bostCtrl.getBost)
  .delete(auth, bostCtrl.deleteBost);

router
  .route("/community/:id")
  .patch(auth, bostCtrl.updateBost)
  .get(auth, bostCtrl.getBost)
  .delete(auth, bostCtrl.deleteBost);

router.patch("/bost/:id/like", auth, bostCtrl.likeBost);
router.patch("/bost/:id/likeleft", auth, bostCtrl.likeleftBost);
router.patch("/bost/:id/likeright", auth, bostCtrl.likerightBost);
router.patch("/bost/:id/unlike", auth, bostCtrl.unLikeBost);
router.patch("/bost/:id/unlikeleft", auth, bostCtrl.unLikeleftBost);
router.patch("/bost/:id/unlikeright", auth, bostCtrl.unLikerightBost);

router.patch("/bost/:id/report", auth, bostCtrl.reportBost);

router.get("/user_bosts/:id", auth, bostCtrl.getUserBosts);

router.get("/bost_discover", auth, bostCtrl.getBostDiscover);
router.get("/bost_allbost", auth, bostCtrl.getAllBosts);

router.patch("/saveBost/:id", auth, bostCtrl.saveBost);
router.patch("/unSaveBost/:id", auth, bostCtrl.unSaveBost);
router.get("/getSaveBosts", auth, bostCtrl.getSaveBost);

module.exports = router;
