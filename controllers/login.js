const handleLogin = async (req, res, postgres, bcrypt) => {
    try {
      const loginData = await postgres
        .select('email', 'hash')
        .from('login')
        .where('email', '=', req.body.email);
  
      if (loginData.length === 0) {
        return res.status(400).json('wrong credentials');
      }
  
      const { email, hash } = loginData[0];
      const isValid = await bcrypt.compare(req.body.password, hash);
  
      if (isValid) {
        const userData = await postgres
          .select('*')
          .from('users')
          .where('email', '=', email);
  
          const cartData = await postgres
          .select('*')
          .from('carts')
          .where('user_id', '=', userData[0].user_id);
  
          userData[0].cart_id = cartData[0].cart_id;
          
        res.json(userData[0]);
      } else {
        res.status(400).json('wrong credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(400).json('unable to login');
    } 
  }

  module.exports = {
    handleLogin: handleLogin
  }