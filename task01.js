
const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(express.json());

// endpoint to read the content of a specified file
app.get('/readFile/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = `./${filename}`;

    const fileContent = await fs.readFile(filePath, 'utf-8');
    res.send(fileContent);
  } catch (error) {
    res.status(500).send('Error reading the file');
  }
});

//endpoint to write new content to a specified file
app.post('/writeFile/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = `./${filename}`;
    const content = req.body.content;

    if (!content) {
      return res.status(400).send('Content is missing');
    }

    await fs.writeFile(filePath, content);
    res.send('File written successfully');
  } catch (error) {
    res.status(500).send('Error writing to the file');
  }
});

//endpoint to append new data to an existing file
app.put('/updateFile/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = `./${filename}`;
    const content = req.body.content;

    if (!content) {
      return res.status(400).send('Content is missing');
    }

    await fs.appendFile(filePath, `${content}\n`);
    res.send('File updated successfully');
  } catch (error) {
    res.status(500).send('Error updating the file');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
