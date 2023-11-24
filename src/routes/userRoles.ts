import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function userRoles(app: FastifyInstance){

    app.get('/user-roles', async ()=>{
        const userRoles = await prisma.userRole.findMany({

            orderBy: {
                name: 'asc'
            }
        }

        )
        return userRoles
    })

    app.get('/user-roles/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const userRole = await prisma.userRole.findUniqueOrThrow( {
            where: {
                id,
            },
        } )
        return userRole
    })

    app.post('/user-roles', async (request) => {

        const bodySchema = z.object({

            name: z.string()
        });

        const {

                name,

            } = bodySchema.parse(request.body);

            const userRole = await prisma.userRole.create({
                data: {

                    name,

                }
            });

            return userRole;

    });


    app.put('/user-roles/:id', async (request) => {

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

            const userRole = await prisma.userRole.update({
                where:{
                    id,
                },
                data: {

                    name,

                }
            });

            return userRole;

    });

    app.delete('/user-roles/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.userRole.delete({
            where: {
                id,
            },
        })
    })


}
