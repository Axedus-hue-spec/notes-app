import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from 'dotenv'
import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolvers/resolvers.js";
import { sequelize } from "./db.js";
import { authCheck } from "./services/authCheck.js";

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function start() {
    try {
        sequelize.sync().then(res => console.log(res))
        const {url} = await startStandaloneServer(server, {
            listen: {port: 4000, path: '/api'},
            cors: {
                origin: "http://localhost:5173",
            },
            context: authCheck,
        })
        console.log(`server starting in ${url}`)
    } catch(e) {
        console.log(e);
    }
}

start();