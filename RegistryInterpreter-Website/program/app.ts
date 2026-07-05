import express from "express";
import { interpreterRouter } from "./router/interpreter.router";
// import { initializeDatabase, testConnection } from './backend/databaseManagement/database';
import { join } from "path";

const app = express();
const port = 3000;

async function startServer() {

    app.use(express.static(join(__dirname, "website", "frontend"), { extensions: ["html", "css", "js"] }));

    app.use(express.json());

    app.use("/api", interpreterRouter);

    const server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    //404 handeling oda so
    app.use((req, res, next) => {
        res.status(404).sendFile(join(__dirname, "website", "frontend", "404.html"));
    });
}

startServer();
