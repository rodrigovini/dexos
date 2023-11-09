import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function serviceOrders(app: FastifyInstance){

    app.get('/service-orders', async ()=>{
        const serviceOrders = await prisma.serviceOrder.findMany({
            orderBy: {
                orderDate: 'asc'
            }
        }

        )
        return serviceOrders
    })

    app.get('/service-orders/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.number(),
        })

        const { id } = paramsSchema.parse(request.params)

        const serviceOrder = await prisma.serviceOrder.findUniqueOrThrow( {
            where: {
                id,
            },
        } )
        return serviceOrder
    })


}
