import { env } from "@/env";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { BadRequestException } from "./BadRequestException";
import { NotFoundException } from "./NotFoundException";

export function handler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (error instanceof BadRequestException) {
    return reply
      .status(400)
      .send({ error: error.error, message: error.message });
  }

  if (error instanceof NotFoundException) {
    return reply
      .status(404)
      .send({ error: error.error, message: error.message });
  }

  if (env.NODE_ENV === "production") {
    console.error(error);
  } else {
    // TODO: use a observability service to log errors
  }

  return reply.status(500).send({ message: "Internal server error." });
}
