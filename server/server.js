const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// GraphQL Schema
const typeDefs = `#graphql

type User {

    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!

}
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    user: User
  }

  type Query {
    todos: [Todo!]!
    users: [User!]!
    getSingleUser(id: ID!): User

  }

  type Mutation {
    addTodo(title: String!): Todo!
    toggleTodo(id: ID!): Todo
  }
`;

// Resolvers
const resolvers = {
  Todo: {
    user: async (todo) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}`
      );
      return response.data;
    },
  },
  Query: {
    todos: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
    users: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
    getSingleUser: async (_, { id }) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.data;
    },
  },
  Mutation: {
    addTodo: (_, { title }) => {
      const newTodo = { id: String(todos.length + 1), title, completed: false };
      todos.push(newTodo);
      return newTodo;
    },
    toggleTodo: (_, { id }) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      return todo;
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000/graphql");
  });
}

startServer();
