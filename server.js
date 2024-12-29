const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const db = require('./src/database/database');

app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  }
});

// Add product API endpoint with file upload
app.post('/api/products', upload.single('image'), (req, res) => {
  const { name, description, original_price, sale_price, category, stock } = req.body;
  const image_path = req.file ? `/uploads/${req.file.filename}` : null;
  
  const query = `INSERT INTO products (name, description, original_price, sale_price, category, stock, image_path)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.run(query, [name, description, original_price, sale_price, category, stock, image_path], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, image_path });
  });
});

// Get all products API endpoint
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
