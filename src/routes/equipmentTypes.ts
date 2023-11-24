import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function equipmentTypes(app: FastifyInstance){

    app.get('/equipament-types', async ()=>{
        const equipmentTypes = await prisma.equipmentType.findMany({

            orderBy: {

                name: 'asc'

            }

        })

        return equipmentTypes
    })

    app.get('/quipament-types/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const equipmentType = await prisma.equipmentType.findUniqueOrThrow( {

            where: {

                id,

            },

        } )

        return equipmentType
    })

    app.post('/quipament-types', async (request) => {

        const bodySchema = z.object({

            name: z.string()

        });

        const { name } = bodySchema.parse(request.body);

            const equipmentType = await prisma.equipmentType.create({

            data: {

                    name,

                }
            });

            return equipmentType;

    });


    app.put('/equipament-types/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({

            name: z.string(),

        });

        const {

                name,


            } = bodySchema.parse(request.body);

            const equipmentType = await prisma.equipmentType.update({
                where:{
                    id,
                },
                data: {

                    name,

                }
            });

            return equipmentType;

    });

    app.delete('/equipament-types/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.equipmentType.delete({
            where: {
                id,
            },
        })
    })


}
