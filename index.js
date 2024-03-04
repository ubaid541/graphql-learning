import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// database
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
  },
  // related data
  Game: {
    // find the data of game with matching id of game_id in review (something like join)
    reviews(parent) {
      // parent refers to main resolver i.e. game
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game, //this game is what we pass to the mutation
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);

      return game;
    },
    updateGame(_, args) {
      // get the specific game and udpate
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }

        return g;
      });

      return db.games.find((g) => g.id === args.id);
    },
  },
};

// server setup
const server = new ApolloServer({
  // type definitions  (definitions of types of data)
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: 4000,
});

console.log("Server started at port", 4000);
