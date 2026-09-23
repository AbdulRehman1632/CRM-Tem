// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, default: '' },
//   status: { type: String, default: 'Pending' },
//   comments: { type: String, default: '' },
//   // Flexible Key-Value storage for dynamic columns
//   customData: {
//     type: Map,
//     of: String,
//     default: {}
//   }
// }, { timestamps: true });

// const listSchema = new mongoose.Schema({
//   title: { type: String, required: true }, // Sub-list name (e.g. "Leads", "Done")
//   items: [itemSchema]
// });

// const boardSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     boardName: { type: String, required: true }, // Board Name (e.g. "Sale Board")
//     // Dynamic columns defined by user
//     customColumns: [{ type: String }], // e.g. ["City", "Budget", "FollowUp Date"]
//     lists: [listSchema] // Nested sub-lists
//   },
//   { timestamps: true }
// );

// export default mongoose.model('CustomBoard', boardSchema);

import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  status: { type: String, default: 'Pending' },
  comments: { type: String, default: '' },
  // Flexible Key-Value storage for dynamic columns
  customData: {
    type: Map,
    of: String,
    default: {}
  }
}, { timestamps: true });

const listSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Sub-list name (e.g. "Leads", "Done")
  items: [itemSchema]
});

const boardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Space ID link karna zaroori hai taake har board apne space ke sath dynamic rahe
    spaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
    boardName: { type: String, required: true }, // Board Name (e.g. "Sale Board")
    // Dynamic columns defined by user
    customColumns: [{ type: String }], // e.g. ["City", "Budget", "FollowUp Date"]
    lists: [listSchema] // Nested sub-lists
  },
  { timestamps: true }
);

export default mongoose.model('CustomBoard', boardSchema);