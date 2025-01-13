const express = require('express');
const path = require('path');
const fs = require('fs'); // Import the fs module
const pdf = require('pdf-parse'); // Import the pdf-parse module
const axios = require('axios'); // Import the axios module
const app = express(); // Create an Express app
const cheerio = require('cheerio'); // Import the cheerio module

const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route for the blog page
// app.get('/blog', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'blog.html'));
// });

// Route for the blog page
app.get('/blog', async (req, res) => {
    try {
      const response = await axios.get('https://walkthrough.so/pblc/gKvgsyDhHksN/effortless-tibco-flogo-deployments-on-aws-lambda-with-terraform');
      const $ = cheerio.load(response.data);
      const blogContent = $('#content').html(); // Adjust the selector to target the specific content you need
      res.render('blog-post', { blogContent });
    } catch (error) {
      res.status(500).send('Error fetching blog content');
    }
  });

// Route for the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route for the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Route for the resume page
app.get('/resume', (req, res) => {
    res.render('resume');
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});