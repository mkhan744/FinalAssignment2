const Product = require('../models/products');


//GET /api/products
exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

//GET /api/products/:id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product ===null){
            return res.status(404).json({message: 'Product not found'});
        }

        res.json(product);
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

//POST /api/products
exports.createProduct = async (req, res) => {
    const product  = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    });

    try{
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (errors){
        res.status(400).json({message: error.message});
    }
}

//PUT /api/products/:id
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product === null){
            return res.status(404).json({message: 'Product not found'});
        }

        if(req.body.name != null){
            product.name = req.body.name;
        }

        if(req.body.description != null){
            product.description = req.body.description;
        }

        if(req.body.price != null){
            product.price = req.body.price;
        }

        if(req.body.quantity != null){
            product.quantity = req.body.quantity;
        }

        if(req.body.category != null){
            product.category = req.body.category;
        }
        

        const updateProduct  = await product.save();
        res.json(updateProduct);

    } catch (error){
        res.status(500).json({message: error.message});
    }
}

//DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product === null){
            return res.status(404).json({message: 'Product not found'});
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({message: 'Product deleted successfully! '});

    } catch (error){
        res.status(500).json({message: error.message});
    }
}


//DELETE /api/products/
exports.deleteProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: 'Deleted All Products' });
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

//GET /api/products/:name
exports.getProductByName = async (req, res) => {
    try {
        const product = await Product.find({ name: req.params.name }); 

        if(product ===null){
            return res.status(404).json({message: 'Product not found'});
        }

        res.json(product);
    } catch(error){
        res.status(500).json({message: error.message});
    }
}