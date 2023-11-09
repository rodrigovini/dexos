import fastify from 'fastify'
import { serviceOrders } from './routes/service-orders'

const app = fastify()

app.register(serviceOrders)


app.get('/', async() => {

    const indexMessage = 'Hello World!'
    return indexMessage

})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server HTTP running...')
  })
