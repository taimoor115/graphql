import { expressMiddleware } from '@as-integrations/express5';
import express from "express";
import startGQLServer from "./graphql/index.js";

async function startServer() {
    const app = express()
    app.use(express.json());


    app.use('/graphql', expressMiddleware(await startGQLServer()));

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}


startServer();