import server from "./server"
import colors from 'colors'

const PORT=  4000

server.listen(PORT, () => {
    console.log(colors.cyan.bold(`REST API en el port ${PORT}`))
})

