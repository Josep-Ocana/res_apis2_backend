import { Router } from "express"
import { Request, Response } from "express"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"
import { 
        createProduct,
        deleteProduct, 
        getProductById, 
        getProducts, 
        updateAvailability, 
        updateProduct 
        } from "./handlers/product"

const router = Router()

// Routing
router.get('/', getProducts)

router.get('/:id', 
    // Validación 
    param('id')
            .isNumeric().withMessage('Debe ser un número'),
    handleInputErrors,
    getProductById
)

router.post('/', 
    // Validación 
    body('name')
            .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),          
    body('price')
            .notEmpty().withMessage('El Precio de Producto no puede ir vacio')
            .isNumeric().withMessage('Debe ser un número')
            .custom( value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
)

router.put('/:id',
    // Validación 
    body('name')
            .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),          
    body('price')
            .notEmpty().withMessage('El Precio de Producto no puede ir vacio')
            .isNumeric().withMessage('Debe ser un número')
            .custom( value => value > 0).withMessage('Precio no válido'),
    body('availability')
            .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct)

router.patch('/:id', 
    // Validación 
    param('id')
            .isNumeric().withMessage('Debe ser un número'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id', 
    // Validación 
    param('id')
            .isNumeric().withMessage('Debe ser un número'),
    handleInputErrors,
    deleteProduct)

export default router