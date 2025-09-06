const queries = {}

const mutations = {
    createUser: async (_: any, { }: {}) => {

        return "User created successfully";
    }
}


export const resolvers = {
    Query: queries,
    Mutation: mutations
}