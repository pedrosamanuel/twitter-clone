"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./data/models/index");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.default);
const PORT = process.env.PORT || 3000;
database_1.default.sync({ alter: true })
    .then(() => {
    console.log('✅ Database connected and synced');
    app.listen(PORT, () => {
        if (process.env.NODE_ENV === 'production') {
            console.log(`🚀 Server running on port ${PORT}`);
        }
        else {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        }
    });
})
    .catch((err) => {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
});
