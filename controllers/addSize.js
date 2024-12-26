const handleAddSize = async (req, res, postgres) => {
    try {
        const { item_id, size_id, quantity } = req.body;

        // Check if the item_size already exists
        const existingItemSize = await postgres
            .select('*')
            .from('item_sizes')
            .where({ item_id, size_id })
            .first();

        if (existingItemSize) {
            // If the item_size exists, update the quantity
            const updatedItemSize = await postgres('item_sizes')
                .where({ item_id, size_id })
                .update({ quantity })
                .returning('*');

            res.json(updatedItemSize[0]);
        } else {
            // If the item_size does not exist, insert a new record
            const newItemSize = await postgres
                .insert({
                    item_id: item_id,
                    size_id: size_id,
                    quantity: quantity
                })
                .into('item_sizes')
                .returning('*');

            res.json(newItemSize[0]);
        }
    } catch (error) {
        console.error('Error adding or updating the size:', error);
        res.status(500).json({ error: 'Error adding or updating the size' });
    }
};

module.exports = {
    handleAddSize: handleAddSize
};
