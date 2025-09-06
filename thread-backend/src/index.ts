import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import prismaClient from "./lib/db.js";

async function startServer() {
    const app = express()
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
        
            type Query {
                hello: String
            }

            type Mutation {
            createUser(firstName: String!, lastName: String!, email: String!, password: String!) : Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello world!'
            },

            Mutation: {
                createUser: async (_, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
                    await prismaClient.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt: "random_salt"
                        }
                    })

                    return true
                },

            }
        },
    })



    await server.start();

    app.use('/graphql', expressMiddleware(server));

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}


startServer();