import fastify from "fastify";

import { registerController } from "./http/controllers/register";
import { handler } from "./http/errors/handler";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);
app.setErrorHandler(handler);
