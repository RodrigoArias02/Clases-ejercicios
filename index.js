class ProductManager{

    constructor(){
        this.products=[]
    }

    getProduct(){
        console.log("Todos los productos:")
        return this.products
    }

    addProduct(title, description,price, thumbnail, stock){
        let code=1
        if (this.products.length > 0) {
            code = this.products[this.products.length - 1].code + 1;
        }

        let repeat = this.products.some(product => product.code === code);

        if (!title || !description || !price || !thumbnail || stock === undefined) {
            console.log(`el producto no se pudo crear debido a que faltaron rellenar algunos campos`);
        
            return;
        }
        if (repeat) {
            console.log(`El código ${code} ya existe en la lista.`);
            return;
        }
        const product = { code, title, description, price, thumbnail, stock };

        this.products.push(product);
    }

    getProductById(codeBuscar){
        let foundProduct = this.products.find(product => product.code === codeBuscar);
        if (foundProduct) {
            console.log(`producto con ID ${codeBuscar} encontrado con exito`)
            console.log(foundProduct);
          } else {
            console.log(`Producto con ID ${codeBuscar} no encontrado.`);
          }
    }
}
let productManager=new ProductManager()
//añadimos productos
productManager.addProduct("Producto 1", "Descripción del producto 1", 10.99, "imagen1.jpg", 100);
productManager.addProduct("Producto 2", "Descripción del producto 1", 10.99, "imagen1.jpg", 100);
productManager.addProduct("Producto 3", "Descripción del producto 1", 10.99, "imagen1.jpg", 100);

//buscamos producto por id
productManager.getProductById(2)

//mostramos todos los productos
console.log(productManager.getProduct())
