import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function brands(app: FastifyInstance){

    app.get('/brands', async ()=>{
        const brands = await prisma.brand.findMany({

            orderBy: {
                name: 'asc'
            }
        }

        )
        return brands
    })

    app.get('/brands/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const brand = await prisma.brand.findUniqueOrThrow( {
            where: {
                id,
            },
        } )
        return brand
    })

    app.post('/brands', async (request) => {

        const bodySchema = z.object({

            name: z.string()
        });

        const {

                name,

            } = bodySchema.parse(request.body);

            const brand = await prisma.brand.create({
                data: {

                    name,

                }
            });

            return brand;

    });


    app.put('/brands/:id', async (request) => {

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

            const brand = await prisma.brand.update({
                where:{
                    id,
                },
                data: {

                    name,

                }
            });

            return brand;

    });

    app.delete('/brands/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.brand.delete({
            where: {
                id,
            },
        })
    })


}
