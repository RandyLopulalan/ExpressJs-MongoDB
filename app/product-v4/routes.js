const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const productControllerV4 = require('./controller')

router.get("/product", productControllerV4.index);
router.get("/product/:id", productControllerV4.view);
router.post("/product", upload.single('image'), productControllerV4.store);
router.put("/product/:id", upload.single("image"), productControllerV4.update);
router.delete("/product/:id", upload.single("image"), productControllerV4.deleteData);

module.exports = router;
