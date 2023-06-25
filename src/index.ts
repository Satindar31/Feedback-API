import Fastify, { FastifyRequest } from "fastify";
import saveFeedback from "./endpoints/feedback.post.js";
import getFeedback from "./endpoints/feedbackMany.get.js";
const app = Fastify({
  // logger: true,
});

await app.register(import('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute',
})

await app.register(import('@fastify/cors'), {
  origin: '*',
})

// Make a endpoint for a feedback clolection API. Make sure to use versioning
app.post(
  "/v1/feedback",
  {
    schema: {
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          message: { type: "string" },
        },
      },
    },
  },
  async (request: FastifyRequest, res) => {
    const { name, email, message, brand } = request.body as {
      name: string;
      email: string;
      message: string;
      brand: number
    };

    // Save feedback to database
    try {
      const response = await saveFeedback({
        name,
        email,
        feedback: message,
        brand: brand
      });
      console.log(response)
      res.status(201).send({ success: true });
    }
    catch (error: any) {
      console.log(error)
      return res.status(500).send(error.message)
    }
  }
);
app.get('/v1/feedback', async (request, res) => {
  const { email } = request.query as {
    email: string
  }

  try {
    const response = await getFeedback({
      email: email
    })
    res.status(200).send(response)
  }
  catch(error: any) {
    console.log(error)
    return res.status(500).send(error.message)
  }
})


app.listen({ port: 3000, host: '0.0.0.0' }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})