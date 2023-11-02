import http from "http";
import app from "./app";


const server = http.createServer(app);
const port = app.get("port");

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default server;