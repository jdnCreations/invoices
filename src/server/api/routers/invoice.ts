import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const invoiceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.invoice.findMany();
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const invoice = ctx.prisma.invoice.findFirst({
      where: { id: input },
      include: { person: true },
    });

    return invoice;
  }),

  getAllInvoiceDataById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      const data = ctx.prisma.invoice.findFirst({
        where: { id: input },
        select: {
          amount: true,
          dueDate: true,
          status: true,
          person: true,
          billFrom: true,
          item: true,
        },
      });

      return data;
    }),

  getAllByUser: protectedProcedure
    .input(z.string() || undefined)
    .query(({ ctx, input }) => {
      return ctx.prisma.invoice.findMany({
        where: {
          userId: input,
        },
        include: {
          person: true,
        },
      });
    }),
});
