export const typeDefs = `
    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type User {
        id: ID!
        username: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        notesByUser: [Note]
    }

    type Mutation {
        login(user: LoginUserInput!): AuthPayload!
        registration(user: RegUserInput!): AuthPayload!
        createNote(content: String!): String!
        deleteNote(noteId: ID!): String!
        updateNote(noteId: ID!, content: String!): String!
    }

    input RegUserInput {
        email: String!
        username: String!
        password: String!
    }

    input LoginUserInput {
        email: String!
        password: String!
    }
`