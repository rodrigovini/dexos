import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function equipments(app: FastifyInstance){

    app.get('/equipaments', async ()=>{

        const equipments = await prisma.equipment.findMany({

            orderBy: {

                description: 'asc'

            }

        })

        return equipments
    })

    app.get('/equipaments/:id', async (request)=>{

        const paramsSchema = z.object({

            id: z.string().uuid(),

        })

        const { id } = paramsSchema.parse(request.params)

        const equipment = await prisma.equipment.findUniqueOrThrow( {

            where: {

                id,

            },

        } )

        return equipment
    })

    app.post('/equipaments', async (request) => {

        const bodySchema = z.object({

            description: z.string(),
            serialNumber: z.string(),
            modelNumber: z.string(),
            brandId: z.string().optional(),
            modelId: z.string().optional(),
            equipmentTypeId: z.string().optional()

        });

        const { description, serialNumber, modelNumber, brandId, modelId, equipmentTypeId } = bodySchema.parse(request.body);

            const equipment = await prisma.equipment.create({

            data: {

                    description,
                    serialNumber,
                    modelNumber,
                    modelId,
                    brandId,
                    equipmentTypeId,

                }
            });

            return equipment;

    });


    app.put('/equipaments/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({

            description: z.string(),
            serialNumber: z.string(),
            modelNumber: z.string(),
            brandId: z.string().optional(),
            modelId: z.string().optional(),
            equipmentTypeId: z.string().optional()


        });

        const {  description, serialNumber, modelNumber, brandId, modelId, equipmentTypeId } = bodySchema.parse(request.body);

            const equipament = await prisma.equipment.update({

                where:{

                    id,

                },

                data: {

                    description,
                    serialNumber,
                    modelNumber,
                    modelId,
                    brandId,
                    equipmentTypeId

                }
            });

            return equipament;

    });

    app.delete('/equipaments/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.equipment.delete({
            where: {
                id,
            },
        })
    })


}
