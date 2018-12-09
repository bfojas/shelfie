

module.exports={

    addItem: (req,res) =>{
        console.log('reqbody', req.body)
    const {name, price, image_url} = req.body;
    let image = image_url
    image === ""
    ? image = 'default_image'
    : image = image_url

    req.app.get('db').add_item({name:name,price:price,image_url:image})
    .then(req.app.get('db').get_inventory()
    .then(items => 
        res.send(items))
    .catch(error => {console.log('error in addItem', error)}))
},

    getInventory: (req,res) =>{
        console.log('hit get')
        req.app.get('db').get_inventory()
        .then(
            (items)=> {res.send(items)}
            )
    },

    delete: (req,res) =>{
        console.log('delete', req.params)
        const {id} = req.params
        req.app.get('db').delete_item({id:id})
        .then(()=>res.sendStatus(200)
            // req.app.get('db').get_inventory()
        .then(
            (items)=>{
            console.log('res',items)                
                res.send(items)}))
        .catch(error => {res.status(500).send({errorMessage: "delete isn't working"})
        console.log('error in delete',error)})
    },

    editItem: (req,res) =>{
        const {id} = req.params;
        const {name, price, image_url} = req.body;
        req.app.get('db').edit_item({id:id, name:name, price:price, image_url:image_url})
        .then(()=>res.sendStatus(200))
        .catch(error=>{res.status(500).send({errorMessage: 'edit function took a shit'})
        console.log('error in edit', error)})
    }





}