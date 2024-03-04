export const typeDefs = `#graphql
type Game {
    id: ID,
    title: String!, # "!" shows required
    platform: [String!]!
    reviews:[Review!]
}

type Review {
    id:ID,
    rating:Int!
    content:String!
    game:Game!
    author:Author!
}

type Author {
    id:ID 
    name:String!
    verified:Boolean!
    reviews:[Review!]

}

# query type is required in graphql to tell the entry what data to return
type Query{ 
    reviews:[Review]
    review(id: ID!):Review #Query variable for a single review
    games: [Game]
    game(id: ID!):Game
    authors:[Author]
}

type Mutation{
    addGame(game:AddGameInput!):Game
    deleteGame(id:ID!):[Game]
    updateGame(id:ID!,edits:EditGameInput):Game
}
# input types for collection of data
input AddGameInput{
    title:String!,
    platform:[String]!
}

input EditGameInput{
    title:String,
    platform:[String]
}
`;
