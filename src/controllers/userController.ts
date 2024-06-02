import { NextFunction, Request, Response } from 'express';

import { UserService } from '@interfaces/IUser';
import { SendEmail } from '@utils/sendEmail';

export class UserController {
  private userService = new UserService();
  private sendEmail = new SendEmail();

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUserById(res.locals.user.id);

      if (!user) {
        return res.status(400).json({
          message: 'User does not exist',
        });
      }

      return res.status(200).json({
        data: user,
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = res.locals.user.id;
      const payload = {
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        verified: true,
      };

      // If the user is updating their email, check if the email is already taken
      if (payload.email) {
        const user = await this.userService.getUserByQuery({ email: payload.email });

        if (user) {
          return res.status(400).json({
            message: 'Email already taken',
          });
        }
        // If user is updating their email, verify their email address again

        // Send verification email
        await this.sendEmail.sendVerificationEmail(id, payload.email);

        // Update user's email_verified field to false to indicate that the user needs to verify their email address
        payload.verified = false;

        await this.userService.findAndUpdateUser(
          { _id: id },
          {
            $set: { email: payload.email, verified: payload.verified },
          },
          { new: true }
        );
      }

      return res.status(200).json({
        data: payload,
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      const user = await this.userService.deleteUser(id);

      if (!user) {
        return res.status(400).json({
          message: 'User does not exist',
        });
      }

      res.status(200).json({
        message: 'User deleted successfully',
        data: user,
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
