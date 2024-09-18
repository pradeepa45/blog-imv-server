"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _server = require("@apollo/server");
var _standalone = require("@apollo/server/standalone");
var _index = _interopRequireDefault(require("./resolvers/index.js"));
var _schema = _interopRequireDefault(require("./schema.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
const port = process.env.PORT || 3300;
const startServer = async () => {
  const server = new _server.ApolloServer({
    typeDefs: _schema.default,
    resolvers: _index.default
  });
  const {
    url
  } = await (0, _standalone.startStandaloneServer)(server, {
    listen: {
      port
    }
  });
  console.log(`🚀  Server ready at: ${url}`);
};
startServer().catch(err => {
  console.error('Error starting server:', err);
});