import { ApolloServer } from "@apollo/server";

async function startGQLServer() {

    const server = new ApolloServer({
        typeDefs: `
            type Query {
                _empty: String
            }
            type Mutation {
                _empty: String
            }
        `,
        resolvers: {
            Query: {
                _empty: () => ""
            },
            Mutation: {
                _empty: () => ""
            }
        },
    })



    await server.start();

    return server;

}


export default startGQLServer   