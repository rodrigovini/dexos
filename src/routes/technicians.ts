import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function technicians(app: FastifyInstance){

    app.get('/technicians', async ()=>{
        const technicians = await prisma.technician.findMany({

            orderBy: {
                createAt: 'asc'
            }
        }

        )
        return technicians
    })

    app.get('/technicians/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const technician = await prisma.technician.findUniqueOrThrow( {
            where: {
                id,
            },
        } )
        return technician
    })

    app.post('/technicians', async (request) => {

        const bodySchema = z.object({

            name: z.string(),
            fullName: z.string(),
            email: z.string(),
            cellPhone: z.string(),
            commercialPhone: z.string().optional(),

        });

        const {

                name,
                fullName,
                email,
                cellPhone,
                commercialPhone

            } = bodySchema.parse(request.body);

            const technician = await prisma.technician.create({
                data: {

                    name,
                    fullName,
                    email,
                    cellPhone,
                    commercialPhone
                }
            });

            return technician;

    });


    app.put('/technicians/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({

            name: z.string(),
            fullName: z.string(),
            email: z.string(),
            cellPhone: z.string(),
            commercialPhone: z.string().optional(),

        });

        const {

                name,
                fullName,
                email,
                cellPhone,
                commercialPhone

            } = bodySchema.parse(request.body);

            const technician = await prisma.technician.update({
                where:{
                    id,
                },
                data: {

                    name,
                    fullName,
                    email,
                    cellPhone,
                    commercialPhone
                }
            });

            return technician;

    });



    app.delete('/technicians/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.technician.delete({
            where: {
                id,
            },
        })
    })


}
