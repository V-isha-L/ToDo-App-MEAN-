const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', // This links it to the 'User' model
    required: true
  },

  taskName: {
    type: String,
    required: true, 
    trim: true      // Removes whitespace from both ends
  },
  isCompleted: {
    type: Boolean,
    default: false // New tasks are not completed by default
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // Only allows these 3 values
    default: 'Medium'
  },
  dueDate: {
    type: Date,
    default: null // Optional due date
  }
}, {
  timestamps: true // adds `createdAt` and `updatedAt` fields
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;