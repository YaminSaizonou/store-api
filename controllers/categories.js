const getCategories =async (req, res, postgres) => {
    try {
        let categories;

        categories = await postgres
            .select('*')
            .from('categories');
        

        res.json(categories);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ error: 'Error retrieving items' });
    }
}

module.exports = {
    getCategories : getCategories,
}