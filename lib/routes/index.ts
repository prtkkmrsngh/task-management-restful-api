import { Request, Response } from 'express';
import UserController from '../controllers/user';
import TaskController from '../controllers/task';

export class Routes {
  public userController: UserController = new UserController();
  public taskController: TaskController = new TaskController();

  public routes(app): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET request successfull!',
      });
    });

    // User
    app
      .route('/user')
      .get(this.userController.getUsers)

      // POST endpoint
      .post(this.userController.addNewUser);

    // User detail
    app
      .route('/user/:userId')
      // get specific user
      .get(this.userController.getUserWithID)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);

    // Task
    app
      .route('/task')
      .get(this.taskController.getTasks)

      // POST endpoint
      .post(this.taskController.addNewTask);

    // Task detail
    app
      .route('/task/:taskId')
      // get specific task
      .get(this.taskController.getTaskWithID)
      .put(this.taskController.updateTask)
      .delete(this.taskController.deleteTask);

    // Task assigned to me
    app.route('/taskAssignedTo').get(this.taskController.getTasksAssignedToMe);

    // Task assigned by me
    app.route('/taskAssignedBy').get(this.taskController.getTasksAssignedByMe);

    // Search task
    app.route('/search').get(this.taskController.getSearch);
  }
}
