import fs from 'fs/promises'
import {Product} from './Product.js'


export class ProductsManager{

    static id = Math.random().toString(36).substring(7)

    constructor(ruta){
        this.ruta=ruta
        this.products=[]

    }

    
    async init() {
        // Inicia el FileStorage. Si el archivo no existe, o no tiene registros, lo crea desde la plantilla 'createJSON'
        try {
            const fileContent = await this.#readProducts()
            if (!fileContent || fileContent.length === 0) { throw new Error('Creating File') } // intercepta si hay error en el archivo
            fileContent.forEach(el => { this.Products.push(el) }) // carga todos los productos del archivo en el PM
            ProductsManager.id = fileContent[fileContent.length - 1].id // Reemplaza el contador de ID por el ultimo en el archivo
            console.log('Archivo leido correctamente') // confirma por consola que el archivo se cargó de forma correcta
        } catch (err) {
            console.log(err.message) // Devuelve el mensaje de error por consola
        }
    }


    async #readProducts(){
        const productsEnJson = await fs.readFile(this.ruta,'utf-8')
        this.products = JSON.parse(productsEnJson)
    }

    async #writeProducts(){
        await fs.writeFile(this.ruta, JSON.stringify(this.products, null, 2))
    }

    getAll(){
        return this.products
    }
        
    /**
     * Agrega un producto enviado por el usuario al array
     * @param {object} prod 
     */

    async addProducts(prod){
    
        try {
            const product= new Product(prod)
            await this.#readProducts()
            this.products.push(product)
            await this.#writeProducts()
            console.log(this.products)
            return {status: 'Ok', message: product}
        } catch (err) {
            return { status: 'Error al Crear el producto', message: err.message }
        }
    }  

}

