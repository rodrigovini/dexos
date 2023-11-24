import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function addresses(app: FastifyInstance){

    app.get('/addresses', async ()=>{
        const addresses = await prisma.address.findMany({

            orderBy: {
                id: 'asc'
            }
        }

        )
        return addresses
    })

    app.get('/addresses/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const address = await prisma.address.findUniqueOrThrow( {
            where: {
                id,
            },
        } )
        return address
    })

    app.post('/addresses', async (request) => {

        const bodySchema = z.object({

            street: z.string(),
            number: z.string(),
            complement: z.string().optional(),
            neighborhood: z.string().optional(),
            zipCode: z.string(),
            city: z.string().optional(),
            state: z.string().optional(),
            country: z.string().optional(),

        });

        const {

            street,
            number,
            complement,
            neighborhood,
            zipCode,
            city,
            state,
            country,

            } = bodySchema.parse(request.body);

            const address = await prisma.address.create({
                data: {

                    street,
                    number,
                    complement,
                    neighborhood,
                    zipCode,
                    city,
                    state,
                    country,

                }
            });

            return address;

    });


    app.put('/addresses/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({

            street: z.string(),
            number: z.string(),
            complement: z.string().optional(),
            neighborhood: z.string().optional(),
            zipCode: z.string(),
            city: z.string().optional(),
            state: z.string().optional(),
            country: z.string().optional(),

        });

        const {

            street,
            number,
            complement,
            neighborhood,
            zipCode,
            city,
            state,
            country,

            } = bodySchema.parse(request.body);

            const address = await prisma.address.update({

                where:{
                    id
                },
                data: {

                    street,
                    number,
                    complement,
                    neighborhood,
                    zipCode,
                    city,
                    state,
                    country,

                }
            });

            return address;

    });

    app.delete('/addresses/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.address.delete({
            where: {
                id,
            },
        })
    })


}
