const getWomenCategories =async (req, res, postgres) => {
    try {
        let categories;

        categories = await postgres
            .select('*')
            .from('categories')
            .where('gender', 'women');        

        res.json(categories);
    } catch (error) {
        console.error('Error retrieving women categories:', error);
        res.status(500).json({ error: 'Error retrieving women categories' });
    }
}

module.exports = {
    getWomenCategories : getWomenCategories
}