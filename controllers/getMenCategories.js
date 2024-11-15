const getMenCategories =async (req, res, postgres) => {
    try {
        let categories;

        categories = await postgres
            .select('*')
            .from('categories')
            .where('gender', 'men');        

        res.json(categories);
    } catch (error) {
        console.error('Error retrieving Men categories:', error);
        res.status(500).json({ error: 'Error retrieving Men categories' });
    }
}

module.exports = {
    getMenCategories : getMenCategories
}