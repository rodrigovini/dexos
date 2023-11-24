import fastify from 'fastify'
import cors from '@fastify/cors'
import { orders } from './routes/orders'
import { users } from './routes/users'
import { clients } from './routes/clients'
import { technicians } from './routes/technicians'
import { brands } from './routes/brands'
import { models } from './routes/models'
import { equipmentTypes } from './routes/equipmentTypes'
import { equipments } from './routes/equipments'
import { userRoles } from './routes/userRoles'

const app = fastify()

app.register(cors, {
    origin: true,
})


app.register(orders)
app.register(users)
app.register(clients)
app.register(technicians)
app.register(brands)
app.register(models)
app.register(equipmentTypes)
app.register(equipments)
app.register(userRoles)


app.get('/', async() => {

    const indexMessage = 'Dexos home!'
    return indexMessage

})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server HTTP running...')
  })
