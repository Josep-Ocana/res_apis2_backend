import { Request, Response } from "express"
import Product from "../models/Product.model"

// Obtener Productos
export const getProducts = async (req :Request, res : Response) => {
    try {
        const products = await Product.findAll({  
            order: [
                ['id', 'ASC']],        
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })
        res.json( { data : products})
    } catch (error) {
        console.log(error)
    }
}

// Obtener Producto por su ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            })
            return
        }

        res.json( { data : product})
    } catch (error) {
        console.log(error)
    }
}

// Crear Producto
export const createProduct = async (req : Request, res : Response) => { 
    try {
        const product = await Product.create(req.body)    
        res.json({ data: product})
    } catch (error) {
        console.log(error)        
    }    
}

// Actualizar Producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            })
            return
        }

        // Actualizar
        await product.update(req.body)
        await product.save()
        
        res.json( { data: product})
        
    } catch (error) {
        console.log(error)
    }
}


export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            })
            return
        }

        // Actualizar
        product.availability = !product.dataValues.availability
        await product.save()       
        
        res.json( { data: product})
        
    } catch (error) {
        console.log(error)
    }
}

// Borrar Producto
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            })
            return
        }

        // Borrar Producto BORRADO PERMANENTE
        await product.destroy()

        // Borrar Producto (Eliminador lógico)
        // Cuando NO se puede eliminar información        
        // product.visibility = 0
        // await product.save()

        res.json( { data: 'Producto Eliminado'})
        
    } catch (error) {
        console.log(error)
    }
}


