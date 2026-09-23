import express from 'express';
import { protect } from '../middleware/auth.js';
import Space from '../models/Space.js';

const router = express.Router();

// 1. Get all Spaces for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const spaces = await Space.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(spaces);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 2. Create new Space with custom or default columns
router.post('/', protect, async (req, res) => {
  try {
    const { name, color, columns } = req.body;

    const defaultColumns = [
      { id: 'todo', label: 'To Do', color: '#A0A0B2' },
      { id: 'inProgress', label: 'In Progress', color: '#4A90E2' },
      { id: 'review', label: 'In Review', color: '#FDAB3D' },
      { id: 'done', label: 'Done', color: '#00C875' }
    ];

    const newSpace = await Space.create({
      userId: req.user._id,
      name,
      color: color || '#7B68EE',
      columns: columns && columns.length > 0 ? columns : defaultColumns
    });

    res.status(201).json(newSpace);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 3. Edit / Rename Space
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, color, columns } = req.body;

    // Check karein ke space exits karta hai aur logged-in user ka hi hai
    let space = await Space.findOne({ _id: req.params.id, userId: req.user._id });

    if (!space) {
      return res.status(404).json({ message: 'Space not found or unauthorized' });
    }

    if (name) space.name = name;
    if (color) space.color = color;
    if (columns) space.columns = columns;

    const updatedSpace = await space.save();
    res.json(updatedSpace);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 4. Delete Space
router.delete('/:id', protect, async (req, res) => {
  try {
    const space = await Space.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!space) {
      return res.status(404).json({ message: 'Space not found or unauthorized' });
    }

    res.json({ message: 'Space deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;