const fs=require('fs')

const ruta="./archivos/productManager.json"
class ProductManager{

    constructor(ruta){
        this.path=ruta
        this.products = [];
    }
     getProduct(){
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
          } catch (error) {
            return [];
          }
    }

    async addProduct(title, description,price, thumbnail, stock){
        let products= await this.getProduct()
        let code=1
        if (products.length > 0) {
            code = products[products.length - 1].code + 1;
        }

        //miramos si hay repetidos con el metodo some(true/false)
        let repeat = products.some(product => product.code === code);

        if (!title || !description || !price || !thumbnail || stock === undefined) {
            console.log(`el producto no se pudo crear debido a que faltaron rellenar algunos campos`);
        
            return;
        }
        if (repeat) {
            console.log(`El código ${code} ya existe en la lista.`);
            return;
        }
        const product = { code, title, description, price, thumbnail, stock };
        products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
    }

    async getProductById(codeBuscar){
        //con el metodo find buscamos por el code, devuelve el producto que coincida
        const products= await this.getProduct()
        let foundProduct = products.find(product => product.code === codeBuscar);
        if (foundProduct) {
            console.log(`producto con ID ${codeBuscar} encontrado con exito`)
            console.log(foundProduct);
            return foundProduct
          } else {
            console.log(`Producto con ID ${codeBuscar} no encontrado.`);
            return false
          }
    }

    async updateProduct(id,nombreCampo,nuevoValor){
        let product = await this.getProductById(id)
        if(product!=false){
            let products = await this.getProduct()
            
            product[nombreCampo] = nuevoValor;

            // Utilizamos un map para reemplazar el objeto
            products = products.map(objeto => {
                if (objeto.code === product.code) {
                    //encuentra coincidencia entonces remplaza objeto con el mismo id
                    return product;
                } else {
                    //como no coicide el id manda el objeto como esta
                    return objeto;
                }
            });
            fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
            console.log("Actualizado con exito")
            console.log(product)
        }
    }
   async deletProduct(id){
        let products = await this.getProduct()
        //si ibjeto.id es diferente a id se incluira en el nuevo array ese objeto
        products = products.filter(objeto => objeto.code !== id);
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
        console.log("eliminado con exito0")
    }
}
let productManager=new ProductManager(ruta)

// mostramos todos los productos
// console.log(productManager.getProduct())

//agregar producto
// productManager.addProduct('Producto 4', 'Descripción del producto 4', 10, 'thumbnail1.jpg', 100);

//Buscar por id
// productManager.getProductById(3)

//actualizar campo
// productManager.updateProduct(1,"description","nuevo valor")

//borrar producto
// productManager.deletProduct(3)
