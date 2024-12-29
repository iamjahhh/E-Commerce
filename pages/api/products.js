import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(500).json({ error: 'Error parsing form data' });
        }

        // Upload image to Cloudinary
        const file = files.image;
        const result = await cloudinary.uploader.upload(file.filepath);

        // Save product to database
        const product = await prisma.product.create({
          data: {
            name: fields.name,
            description: fields.description,
            originalPrice: parseFloat(fields.original_price),
            salePrice: fields.sale_price ? parseFloat(fields.sale_price) : null,
            category: fields.category,
            stock: parseInt(fields.stock),
            imagePath: result.secure_url
          }
        });

        res.status(200).json({ success: true, product });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
