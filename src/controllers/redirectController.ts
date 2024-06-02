import { NextFunction, Request, Response } from 'express';

import { UrlService } from '@interfaces/IUrl';

export class RedirectController {
  private urlService = new UrlService();

  public redirect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const urlCode = req.params.urlCode;

      const url = await this.urlService.redirectUrl(urlCode);

      if (url) {
        return res.status(302).redirect(url.longUrl);
      }

      return res.status(404).json({
        message: 'URL not found',
      });
    } catch (err: any) {
      res.status(500).send('Internal Server Error');
      console.error(err.message);
    }
  };
}
