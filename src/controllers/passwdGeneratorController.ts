import { NextFunction, Request, Response } from 'express';

import { generatePassword } from '@utils/passwordGenerator';

export class PasswdGeneratorController {
  public generateRandomPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const length = parseInt(req.query.length as string) || 12; // Default length is 12
      const password = generatePassword(length);

      return res.status(200).json({ password });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
