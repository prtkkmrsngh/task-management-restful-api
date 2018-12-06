import * as mongoose from 'mongoose';
import UserSchema from '../models/user';

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    assignees: {
      type: [UserSchema],
      required: true,
    },
    description: String,
    creator: [UserSchema],
    starts_on: Date,
    due_on: Date,
    complete_on: Date,
    status: String,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default TaskSchema;
