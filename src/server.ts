import { env } from "./env"
import { app } from "./app"

app.listen({
    host: '0.0.0.0', //esse host torna possível outros fronts acessarem o server
    port: env.PORT,
}).then(()=>{
    console.log('🚀HTTP Server Running!')
})