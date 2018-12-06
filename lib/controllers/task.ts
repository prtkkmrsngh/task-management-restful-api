import * as mongoose from 'mongoose';
import TaskSchema from '../models/task';
import UserSchema from '../models/user';
import { Request, Response } from 'express';

const Task = mongoose.model('Task', TaskSchema);
const User = mongoose.model('User', UserSchema);

export default class TaskController {
  public addNewTask(req: Request, res: Response) {
    User.findById(req.body.assignees, (err, user) => {
      if (err) {
        res.send(err);
      }

      req.body.assignees = user;
      const newTask = new Task(req.body);

      newTask.save((err, user) => {
        if (err) {
          res.send(err);
        }
        res.json(user);
      });
    });
  }

  public getSearch(req: Request, res: Response) {
    Task.find(
      { title: { $regex: req.query.q, $options: 'i' } },
      (err, task) => {
        if (err) {
          res.send(err);
        }
        res.json(task);
      }
    );
  }

  public getTasks(req: Request, res: Response) {
    Task.find({}, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }

  public getTasksAssignedToMe(req: Request, res: Response) {
    Task.find({ 'assignees._id': req.body.id }, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }

  public getTasksAssignedByMe(req: Request, res: Response) {
    Task.find({ 'creator._id': req.body.id }, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }

  public getTaskWithID(req: Request, res: Response) {
    Task.findById(req.params.taskId, (err, task) => {
      if (err) {
        res.send(err);
      }
      res.json(task);
    });
  }

  public updateTask(req: Request, res: Response) {
    if (req.body.assignees) {
      User.findById(req.body.assignees, (err, user) => {
        if (err) {
          res.send(err);
        }

        req.body.assignees = user;
      });
    }
    Task.findOneAndUpdate(
      { _id: req.params.taskId },
      req.body,
      { new: true },
      (err, task) => {
        if (err) {
          res.send(err);
        }
        res.json(task);
      }
    );
  }

  public deleteTask(req: Request, res: Response) {
    Task.findOneAndDelete({ _id: req.params.taskId }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully Deleted!' });
    });
  }
}
