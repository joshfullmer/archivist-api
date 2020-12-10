import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schema';
import { sequelize } from './sequelize';
import { createUserContext, login, signup } from './auth';

const app = express();

app.use(bodyParser.json());

const allowlist = [
  /http:\/\/localhost:\d{2,5}/g,
];

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (origin === undefined || origin === 'null') {
      callback(null, true);
    } else {
      const isAllowed = allowlist.find((pattern) => {
        return origin.match(pattern);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
};

app.use(cors(corsOptions));

app.post('/signup', signup);
app.post('/login', login);

const server = new ApolloServer({
  context: createUserContext,
  resolvers,
  typeDefs,
});

server.applyMiddleware({ app });

sequelize.sync().then(async () => {
  app.listen(4000, () => {
    console.log('🚀  Server ready at on port 4000');
  });
});