const handleDeleteItem = async (req, res, postgres) => {
    const { id } = req.params; // Access 'id' from params

    if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
    }

    try {
        const deletedItem = await postgres.transaction(async (trx) => {
            const deletedItems = await trx
                .delete()
                .from('items')
                .where('item_id', id)
                .returning('*');

            await trx
                .delete()
                .from('item_sizes')
                .where('item_id', id);

            return deletedItems;
        });

        if (deletedItem.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(deletedItem);
    } catch (error) {
        console.error('The item was not deleted:', error);
        res.status(500).json({ error: 'The item was not deleted' });
    }
}

module.exports = {
    handleDeleteItem
};
