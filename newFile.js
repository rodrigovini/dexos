import { server } from './server';

server.get('/', () => {
    return 'helloWorld';
});
