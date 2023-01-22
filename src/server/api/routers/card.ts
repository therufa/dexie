import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const cardRouter = createTRPCRouter({
  filter: publicProcedure
    .input(z.object({
      name: z.string().nullable(),
    }))
    .query(({ ctx, input }) => {
      const name = input.name;

      if (!name) {
        return ctx.prisma.card.findMany();
      }

      return ctx.prisma.card.findMany({
        where: {
          name: {
            path: ['en_US'],
            string_contains: name,
          }
        }
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany();
  }),
});

export type CardRouter = typeof cardRouter;