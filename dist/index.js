"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// import bodyParser from 'body-parser';
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("src/routes"));
//import router from './router';
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true
}));
app.use(express_1.default.json());
// app.use(bodyParser.json());
app.use((0, routes_1.default)());
const PORT = 3000;
app.get('/ping', (_, res) => {
    console.log('someone pinged here!!');
    return res.status(200).send('pong');
});
app.get('/', (_, res) => {
    return res.send('hello world!');
});
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map