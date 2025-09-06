import { ApolloServer } from "@apollo/server";
import { User } from "./user/index.js";

async function startGQLServer() {

    const server = new ApolloServer({
        typeDefs: `
            type Query {
                # ${User.queries}
                hello:  String
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.Query
            },
            Mutation: {
                ...User.resolvers.Mutation
            }
        },
    })



    await server.start();

    return server;

}


export default startGQLServer   