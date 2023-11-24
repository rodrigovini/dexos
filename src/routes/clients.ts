import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function clients(app: FastifyInstance){

    app.get('/clients', async ()=>{
        const clients = await prisma.client.findMany({

            orderBy: {
                createAt: 'asc'
            }
        }

        )
        return clients
    })

    app.get('/clients/:id', async (request)=>{

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const client = await prisma.client.findUniqueOrThrow( {
            where: {
                id,
            },
        } )
        return client
    })

    app.post('/clients', async (request) => {

        const bodySchema = z.object({

            clientType: z.string(),
            name: z.string(),
            email: z.string().email(),
            fullName: z.string().optional(),
            gender: z.string().optional(),
            dateOfBirth: z.date().optional(),
            cpf: z.string().optional(),
            nationality: z.string().optional(),
            rg: z.string().optional(),
            companyName: z.string().optional(),
            tradeName: z.string().optional(),
            cnpj: z.string().optional(),
            stateRegistration: z.string().optional(),
            activityField: z.string().optional(),
            residentialPhone: z.string().optional(),
            cellPhone: z.string().optional(),
            commercialPhone: z.string().optional(),

        });

        const {

                clientType,
                name,
                email,
                fullName,
                gender,
                dateOfBirth,
                cpf,
                nationality,
                rg,
                companyName,
                tradeName,
                cnpj,
                stateRegistration,
                activityField,
                residentialPhone,
                cellPhone,
                commercialPhone } = bodySchema.parse(request.body);

            const client = await prisma.client.create({
                data: {

                    clientType,
                    name,
                    email,
                    fullName,
                    gender,
                    dateOfBirth,
                    cpf,
                    nationality,
                    rg,
                    companyName,
                    tradeName,
                    cnpj,
                    stateRegistration,
                    activityField,
                    residentialPhone,
                    cellPhone,
                    commercialPhone,
                }
            });

            return client;

    });


    app.put('/clients/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({

            clientType: z.string(),
            name: z.string(),
            email: z.string().email(),
            fullName: z.string().optional(),
            gender: z.string().optional(),
            dateOfBirth: z.date().optional(),
            cpf: z.string().optional(),
            nationality: z.string().optional(),
            rg: z.string().optional(),
            companyName: z.string().optional(),
            tradeName: z.string().optional(),
            cnpj: z.string().optional(),
            stateRegistration: z.string().optional(),
            activityField: z.string().optional(),
            residentialPhone: z.string().optional(),
            cellPhone: z.string().optional(),
            commercialPhone: z.string().optional(),

        });

        const {

                clientType,
                name,
                email,
                fullName,
                gender,
                dateOfBirth,
                cpf,
                nationality,
                rg,
                companyName,
                tradeName,
                cnpj,
                stateRegistration,
                activityField,
                residentialPhone,
                cellPhone,
                commercialPhone } = bodySchema.parse(request.body);

            const client = await prisma.client.update({
                where:{
                    id,
                },
                data: {

                    clientType,
                    name,
                    email,
                    fullName,
                    gender,
                    dateOfBirth,
                    cpf,
                    nationality,
                    rg,
                    companyName,
                    tradeName,
                    cnpj,
                    stateRegistration,
                    activityField,
                    residentialPhone,
                    cellPhone,
                    commercialPhone,
                }
            });

            return client;

    });



    app.delete('/clients/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.client.delete({
            where: {
                id,
            },
        })
    })


}
