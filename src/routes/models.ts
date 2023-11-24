import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function models(app: FastifyInstance){

    app.get('/models', async ()=>{
        const models = await prisma.model.findMany({

            orderBy: {

                name: 'asc'

            }

        })

        return models
    })

    app.get('/models/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const model = await prisma.model.findUniqueOrThrow( {

            where: {

                id,

            },

        } )

        return model
    })

    app.post('/models', async (request) => {

        const bodySchema = z.object({

            name: z.string(),
            brandId: z.string().optional()

        });

        const { name, brandId, } = bodySchema.parse(request.body);

            const model = await prisma.model.create({

            data: {

                    name,
                    brandId,

                }
            });

            return model;

    });


    app.put('/models/:id', async (request) => {

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

            const model = await prisma.model.update({
                where:{
                    id,
                },
                data: {

                    name,

                }
            });

            return models;

    });

    app.delete('/models/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.model.delete({
            where: {
                id,
            },
        })
    })


}
