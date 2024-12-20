const handleItems =async (req, res, postgres) => {
    try {
        let items;

        items = await postgres
            .select('*')
            .from('items');
        

        res.json(items);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ error: 'Error retrieving items' });
    }
}

module.exports = {
    handleItems: handleItems
}