const handleProfiles = async (req, res, postgres) => {
    try {
        const user = await postgres
            .select('*')
            .from('users')
        if (user) {
            res.json(user);
        } else {
            res.status(404).json('Error retrieving users');
        }
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Error retrieving user profile' });
    }
}

module.exports = {
    handleProfiles: handleProfiles
}