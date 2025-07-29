"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteController_1 = require("../controllers/noteController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// The authMiddleware will run before any route in this file
router.use(authMiddleware_1.authMiddleware);
router.get('/', noteController_1.getNotes);
router.post('/', noteController_1.createNote);
// Delete route will be added later
exports.default = router;
//# sourceMappingURL=noteRoutes.js.map