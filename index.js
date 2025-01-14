const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());

const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/api', categoryRoutes);
app.use('/api', userRoutes);


app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Documentatie</title>
      </head>
      <body>
        <h1>API Documentatie</h1>
        <p>Welkom bij de API-documentatie! Hieronder staan de beschikbare endpoints:</p>
        <ul>
          <li><strong>GET /api/categories</strong> - Haal alle categorieën op</li>
          <li><strong>GET /api/categories?limit=<i>number</i>&offset=<i>number</i></strong> - Haal categorieën op met limiet en offset (paginering)</li>
          <li><strong>GET /api/categories?search=<i>term</i></strong> - Zoek categorieën op basis van naam</li>
          <li><strong>POST /api/categories</strong> - Voeg een nieuwe categorie toe</li>
          <li><strong>PUT /api/categories/:id</strong> - Werk een bestaande categorie bij</li>
          <li><strong>DELETE /api/categories/:id</strong> - Verwijder een categorie</li>
          <br />
          <li><strong>GET /api/users</strong> - Haal alle gebruikers op</li>
          <li><strong>POST /api/users</strong> - Voeg een nieuwe gebruiker toe</li>
          <li><strong>PUT /api/users/:id</strong> - Werk een bestaande gebruiker bij</li>
          <li><strong>DELETE /api/users/:id</strong> - Verwijder een gebruiker</li>
        </ul>
      </body>
    </html>
  `);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
