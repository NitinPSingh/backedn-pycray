import express from 'express';
import { Property, FinancialRecord } from '../models';
import { Sequelize } from 'sequelize';
const { exec } = require('child_process');
const router = express.Router();


router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

router.get('/populate', (req, res) => {
  exec('python data.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('An error occurred while executing the script.');
      return;
    }
    res.send('Data fetched successfully!');
  });
})

router.get('/financials', async (req, res) => {
  try {
    const financials = await FinancialRecord.findAll({
      attributes: {
        include: [
          [Sequelize.col('Property.propertyName'), 'propertyName'],
          [Sequelize.col('Property.ownerName'), 'ownerName'],
          [Sequelize.col('Property.id'), 'propId']
        ]
      },
      include: [
        {
          model: Property,
          attributes: []
        },
      ],
    });

    res.json(financials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch financial records' });
  }
});




router.post('/properties', async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    await property.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/financials', async (req, res) => {
  try {
    const financialRecord = await FinancialRecord.create(req.body);
    const financialRecordWithProperty = await FinancialRecord.findOne({
      where: { id: financialRecord.id },
      attributes: {
        include: [
          [Sequelize.col('Property.propertyName'), 'propertyName'],
          [Sequelize.col('Property.ownerName'), 'ownerName'],
          [Sequelize.col('Property.id'), 'propId']
        ]
      },
      include: [
        {
          model: Property,
          attributes: [],
        },
      ],
    });

    res.status(201).json(financialRecordWithProperty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.delete('/financials/:id', async (req, res) => {
  try {
    const financialRecord = await FinancialRecord.findByPk(req.params.id);
    if (!financialRecord) {
      return res.status(404).json({ error: 'Financial record not found' });
    }
    await financialRecord.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
