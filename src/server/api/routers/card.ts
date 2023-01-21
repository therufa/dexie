import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import data from '../../cards.json';

export const cardRouter = createTRPCRouter({
  single: publicProcedure
    .input(z.object({
      name: z.string().nullable()
    }))
    .query(({ input }) => {
      const name = input.name || 'World';
      const cards = data.cards.filter(
        card => card.name.en_US.toLowerCase()
          .match(new RegExp(name.toLowerCase()))
      )

      return cards;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

export type CardRouter = typeof cardRouter;