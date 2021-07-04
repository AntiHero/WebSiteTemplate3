const { join } = require("path");
const fastify = require("fastify")({
  logger: true,
});
const fastifyPug = require("fastify-pug");

async function startServer() {
  const app = fastify;

  app.register(fastifyPug, {
    views: join(__dirname, "views"),
    filename: (view) => `src/views/${view}`,
  });

  app.get("/", (request, reply) => {
    reply.render("/pages/home.pug", {
      meta: {
        data: {
          title: "Evergreen Forest",
          description: "let the forest engulf you",
        },
      },
    });
  });
  
  app.get("/about", (request, reply) => {
    reply.render("/pages/about.pug");
  });

  app.get("/trees", (request, reply) => {
    reply.render("/pages/trees.pug");
  });

  app.get("/detail/:", (request, reply) => {
    reply.render("/pages/detail.pug");
  });

  app.listen(3001, (err, address) => {
    if (err) {
      fastify.log.error(err);
      // process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
  });

  // process.on('SIGHUP', () => {

  // });

  // process.on('SIGINT', () => {
  //   // this is only called on ctrl+c, not restart
  //   process.kill(process.pid, 'SIGINT');
  // });
}

startServer();
