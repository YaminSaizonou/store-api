const handleAddCategory = async (req, res, postgres) => {
    try{
        const { category_name, category_id, gender} = req.body;
        const categories = await postgres
                .insert({
                    category_id: category_id,
                    category_name: category_name,
                    gender : gender
                })
                .into('categories')
                .returning('*');
                
                res.json(categories[0]);
    }
    catch (error) {
        console.error('Error adding the categories:', error);
        res.status(500).json({ error: 'Error adding the categories' });
    }
}

module.exports = {
    handleAddCategory: handleAddCategory
}