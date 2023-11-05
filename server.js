import { fastify } from 'fastify'

const server = fastify()


server.get('/', () => {

    return 'Hello World'

})

server.post('/videos', () => {

    return 'post video'

})

server.get('/videos', () => {

    return 'get video'

})


server.listen({

    port: 3333,

})
