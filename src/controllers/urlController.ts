import { NextFunction, Request, Response } from 'express';

import { UrlService } from '@interfaces/IUrl';
import { UrlInput, UrlCodeInput } from '@/schema/urlSchema';

export class UrlController {
  private urlService = new UrlService();

  public createShortUrl = async (req: Request<{}, UrlInput['body']>, res: Response, next: NextFunction) => {
    try {
      const { originalUrl } = req.body;
      const userId = res.locals.user.id;

      const url = await this.urlService.createShortUrl(userId, { originalUrl });

      return res.status(201).json({
        data: url,
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  public getAllUrls = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user.id;

      const urls = await this.urlService.getUrlsByQuery({ userId });

      return res.status(200).json({
        data: urls,
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  public updateShortUrl = async (
    req: Request<UrlCodeInput['params'], UrlInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const urlCode = req.params.urlCode;
      const { originalUrl } = req.body;

      const url = await this.urlService.findAndUpdateUrl(
        { urlCode },
        {
          $set: { originalUrl },
        },
        { new: true }
      );

      if (!url) {
        return res.status(404).json({
          message: 'URL not found',
        });
      }

      return res.status(200).json({
        data: url,
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };

  public deleteShortUrl = async (req: Request<UrlCodeInput['params']>, res: Response, next: NextFunction) => {
    try {
      const urlCode = req.params.urlCode;

      const url = await this.urlService.deleteUrl(urlCode);

      if (!url) {
        return res.status(404).json({
          message: 'URL not found',
        });
      }

      return res.status(200).json({
        message: 'URL deleted successfully',
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
