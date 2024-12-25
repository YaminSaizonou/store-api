const handleItem = async (req, res, postgres) => {
    try {
        const { id } = req.params;
        const item = await postgres
            .select('*')
            .from('items')
            .where('item_id', id)
            .first();

        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }    
    } catch (error) {
        console.error('Error retrieving item:', error);
        res.status(500).json({ error: 'Error retrieving item' });
    }
}

module.exports = {
    handleItem: handleItem
}