// import express from 'express';
// import CustomList from '../models/CustomList.js';
// import { protect } from '../middleware/auth.js';

// const router = express.Router();

// // Get all boards for logged-in user
// router.get('/', protect, async (req, res) => {
//   try {
//     const boards = await CustomList.find({ userId: req.user._id });
//     res.json(boards);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Create new Board (e.g. Sale Board)
// router.post('/', protect, async (req, res) => {
//   try {
//     const { boardName } = req.body;
//     const newBoard = await CustomList.create({
//       userId: req.user._id,
//       boardName,
//       customColumns: [],
//       lists: [{ title: 'General List', items: [] }]
//     });
//     res.status(201).json(newBoard);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Add Custom Column to Board
// router.post('/:boardId/columns', protect, async (req, res) => {
//   try {
//     const { columnName } = req.body;
//     const board = await CustomList.findOne({ _id: req.params.boardId, userId: req.user._id });
//     if (!board) return res.status(404).json({ message: 'Board not found' });

//     if (!board.customColumns.includes(columnName)) {
//       board.customColumns.push(columnName);
//       await board.save();
//     }
//     res.json(board);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Add Sub-List to Board
// router.post('/:boardId/lists', protect, async (req, res) => {
//   try {
//     const { title } = req.body;
//     const board = await CustomList.findOne({ _id: req.params.boardId, userId: req.user._id });
//     if (!board) return res.status(404).json({ message: 'Board not found' });

//     board.lists.push({ title, items: [] });
//     await board.save();
//     res.json(board);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Add Record Item inside Sub-List
// router.post('/:boardId/lists/:listId/items', protect, async (req, res) => {
//   try {
//     const { name, email, phone, status, comments, customData } = req.body;
//     const board = await CustomList.findOne({ _id: req.params.boardId, userId: req.user._id });
//     if (!board) return res.status(404).json({ message: 'Board not found' });

//     const list = board.lists.id(req.params.listId);
//     if (!list) return res.status(404).json({ message: 'Sub-list not found' });

//     list.items.push({ name, email, phone, status, comments, customData });
//     await board.save();
//     res.json(board);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// export default router;



import express from 'express';
import CustomList from '../models/CustomList.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// 1. Get all boards for logged-in user filtered by Space ID
router.get('/', protect, async (req, res) => {
  try {
    const { spaceId } = req.query;

    if (!spaceId) {
      return res.status(400).json({ message: 'spaceId query parameter is required' });
    }

    // Sirf logged-in user aur specific Space ID ka board filter hoga
    const boards = await CustomList.find({
      userId: req.user._id,
      spaceId: spaceId
    }).sort({ createdAt: -1 });

    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 2. Create new Board under specific Space ID
router.post('/', protect, async (req, res) => {
  try {
    const { boardName, spaceId } = req.body;

    if (!spaceId) {
      return res.status(400).json({ message: 'Space ID is required to create a board' });
    }

    const newBoard = await CustomList.create({
      userId: req.user._id,
      spaceId, // Space ID store kar li
      boardName,
      customColumns: [],
      lists: [{ title: 'General List', items: [] }]
    });

    res.status(201).json(newBoard);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 3. Add Custom Column to Board
router.post('/:boardId/columns', protect, async (req, res) => {
  try {
    const { columnName } = req.body;
    const board = await CustomList.findOne({ _id: req.params.boardId, userId: req.user._id });
    if (!board) return res.status(404).json({ message: 'Board not found' });

    if (!board.customColumns.includes(columnName)) {
      board.customColumns.push(columnName);
      await board.save();
    }
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 4. Add Sub-List to Board
router.post('/:boardId/lists', protect, async (req, res) => {
  try {
    const { title } = req.body;
    const board = await CustomList.findOne({ _id: req.params.boardId, userId: req.user._id });
    if (!board) return res.status(404).json({ message: 'Board not found' });

    board.lists.push({ title, items: [] });
    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 5. Add Record Item inside Sub-List
router.post('/:boardId/lists/:listId/items', protect, async (req, res) => {
  try {
    const { name, email, phone, status, comments, customData } = req.body;
    const board = await CustomList.findOne({ _id: req.params.boardId, userId: req.user._id });
    if (!board) return res.status(404).json({ message: 'Board not found' });

    const list = board.lists.id(req.params.listId);
    if (!list) return res.status(404).json({ message: 'Sub-list not found' });

    list.items.push({ name, email, phone, status, comments, customData });
    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;