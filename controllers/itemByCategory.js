const handleItemsByCategory = async (req, res, postgres) => {
    try {
        const { category_id } = req.body;  // Get the category from query parameters (e.g., /items?category=electronics)

        let items;

        if (category_id) {
            // If category is provided, filter the items by the category
            items = await postgres
                .select('*')
                .from('items')
                .where('category_id', category_id);  // Assuming 'category' is the column name in your table
        } 

        res.json(items);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ error: 'Error retrieving items' });
    }
}

module.exports = {
    handleItemsByCategory: handleItemsByCategory
};