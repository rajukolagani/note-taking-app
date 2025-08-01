"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const noteRoutes_1 = __importDefault(require("../routes/noteRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware - CORRECT ORDER
app.use(express_1.default.json()); // Parse JSON request bodies FIRST
app.use((0, cors_1.default)()); // Handle CORS after body is parsed
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/notes', noteRoutes_1.default);
// Database Connection
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})
    .catch((error) => console.log(`Error connecting to MongoDB: ${error}`));
//# sourceMappingURL=index.js.map