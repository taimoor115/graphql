import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

async function startServer() {
    const app = express()
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
        
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello world!'
            }
        }
    })


    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}


startServer();