const handleAddSize = async (req, res, postgres) => {
    try{
        const { item_id, size_id, quantity } = req.body;
        const itemSize = await postgres
                .insert({
                    item_id: item_id,
                    size_id: size_id,
                    quantity: quantity
                })
                .into('item_sizes')
                .returning('*');
                
                res.json(itemSize[0]);
    }
    catch (error) {
        console.error('Error adding the size:', error);
        res.status(500).json({ error: 'Error adding the size' });
    }
}

module.exports = {
    handleAddSize: handleAddSize
}