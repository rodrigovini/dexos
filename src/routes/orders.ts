import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function orders(app: FastifyInstance){

    app.get('/orders', async ()=>{
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        }

        )
        return orders
    })

    app.get('/orders/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const order = await prisma.order.findUniqueOrThrow( {
            where: {
                id,
            },
        } )
        return order
    })

    app.post('/orders', async (request) => {
        const bodySchema = z.object({
            createdById: z.string().uuid(),
            clientId: z.string().uuid(),
            equipmentId: z.string().uuid(),
            status: z.string()
        });


            const { createdById, clientId, equipmentId, status } = bodySchema.parse(request.body);

            // Check if the referenced IDs exist in their respective tables
            const userExists = await prisma.user.findUnique({ where: { id: createdById } });
            const clientExists = await prisma.client.findUnique({ where: { id: clientId } });
            const equipmentExists = await prisma.equipment.findUnique({ where: { id: equipmentId } });

            if (!userExists || !clientExists || !equipmentExists) {
                throw new Error('Invalid reference in foreign key');
            }

            const order = await prisma.order.create({
                data: {
                    createdById,
                    clientId,
                    equipmentId,
                    status
                }
            });

            return order;

    });




    app.put('/orders/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            createdById: z.string().uuid(),
            clientId: z.string().uuid(),
            equipmentId: z.string().uuid(),
            status: z.string()
        });


            const { createdById, clientId, equipmentId, status } = bodySchema.parse(request.body);

            // Check if the referenced IDs exist in their respective tables
            const userExists = await prisma.user.findUnique({ where: { id: createdById } });
            const clientExists = await prisma.client.findUnique({ where: { id: clientId } });
            const equipmentExists = await prisma.equipment.findUnique({ where: { id: equipmentId } });

            if (!userExists || !clientExists || !equipmentExists) {
                throw new Error('Invalid reference in foreign key');
            }

            const order = await prisma.order.update({
                where: {
                    id,
                },
                data: {
                    createdById,
                    clientId,
                    equipmentId,
                    status
                }
            });

            return order;




    })





    app.delete('/orders/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.order.delete({
            where: {
                id,
            },
        })
    })


}
