const express = require('express');
const app = express();

const ecommerceRoutes = require('./ecommerceRoutes');
const passwordStrengthRoutes = require('./passwordStrengthRoutes');

const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) =>{
  res.send("******** HELLO WELCOME TO THE DASHBOARD ******* <br><br> 1. To check password strength go to route password/check-password <br><br> 2. To visit Ecommerce details: <br> i) For displaying products go to route&nbsp; /ecommerce/products <br> ii) For adding a product to the cart go to route&nbsp; /ecommerce/cart/add/:productId <br> iii) To view product details by ID go to route&nbsp; /ecommerce/products/:id <br> iv) For user authentication go to route&nbsp; /ecommerce/login<br>");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/ecommerce', ecommerceRoutes); // Mounting ecommerceRoutes
app.use('/password', passwordStrengthRoutes); // Mounting passwordStrengthRoutes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
