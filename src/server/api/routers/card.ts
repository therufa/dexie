import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const cardRouter = createTRPCRouter({
  filter: publicProcedure
    .input(z.object({
      name: z.string().nullable(),
      hero: z.boolean().default(false),
      tier: z.number().nullable().default(null),
      minionTypes: z.array(z.number()).nullable().default(null),
    }))
    .query(({ ctx, input }) => {
      const name = input.name ? {
        path: ['en_US'],
        string_contains: input.name,
      } : undefined;


      return ctx.prisma.card.findMany({
        where: {
          name,
          hero: input.hero,
          tier: input.tier,
          minionTypeId: input.minionTypes?.length
            ? { in: input.minionTypes }
            : undefined,
        }
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany();
  }),
});

export type CardRouter = typeof cardRouter;