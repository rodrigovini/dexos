import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function users(app: FastifyInstance){

    app.get('/users', async ()=>{

        const users = await prisma.user.findMany({

            orderBy: {
                createAt: 'asc'
            }
        }

        )
        return users
    })

    app.get('/users/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const user = await prisma.user.findUniqueOrThrow( {

            where: {
                id,
            },

        } )

        return user
    })

    app.post('/users', async (request) => {

        const bodySchema = z.object({

            email: z.string(),
            username: z.string(),
            fullName: z.string(),
            whatsappNumber: z.string(),
            addressId: z.string().optional(),
            facebook: z.string(),
            twitter: z.string(),
            instagram: z.string(),
            linkedin: z.string(),

        });

        const { email, username, fullName, whatsappNumber, addressId ,facebook, twitter , instagram, linkedin, } = bodySchema.parse(request.body);

        const user = await prisma.user.create({

                data: {
                    email,
                    username,
                    fullName,
                    whatsappNumber,
                    addressId,
                    facebook,
                    twitter,
                    instagram,
                    linkedin
                }

        });

            return user;
    });

    app.put('/users/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({

            email: z.string(),
            username: z.string(),
            fullName: z.string(),
            whatsappNumber: z.string(),
            addressId: z.string().optional(),
            facebook: z.string(),
            twitter: z.string(),
            instagram: z.string(),
            linkedin: z.string(),

        });

        const { email, username, fullName, whatsappNumber, addressId ,facebook, twitter , instagram, linkedin, } = bodySchema.parse(request.body);

        const user = await prisma.user.update({

            where: {
                id,
            },
                data: {
                    email,
                    username,
                    fullName,
                    whatsappNumber,
                    addressId,
                    facebook,
                    twitter,
                    instagram,
                    linkedin
                }

        });

            return user;

    });

    app.delete('/users/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.user.delete({
            where: {
                id,
            },
        })
    })


}
