const handleAddItem = async (req, res, postgres)  => {
    try{
     const { name, price, description, category_id} = req.body;
     const image = req.file.path;
     const item = await postgres
     .insert({
         name: name,
         price: price,
         description: description,
         image: image,
         category_id: category_id

     })
     .into('items')
     .returning('*');
     res.json(item[0]);
    }
    catch (error) {
     console.error('Error adding the item:', error);
     res.status(500).json({ error: 'Error adding the item' });
    }
 }

 module.exports = {
     handleAddItem: handleAddItem
 }