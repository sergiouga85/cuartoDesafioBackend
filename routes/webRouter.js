import { Router } from "express";
import {pm} from '../src/app.js'
export const webRouter = Router()

webRouter.get('/', (req, res) => {
    const productos = pm.getAll()
    res.render('home', { productos: productos })

})

webRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { titulo: 'Productos en Tiempo Real' })
})

