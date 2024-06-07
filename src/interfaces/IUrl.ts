import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IUrl, Url } from '@models/urlModel';

export class UrlService {
  /**
   * @description Redirect to Original URL
   * @Access Public access
   */
  public async redirectUrl(urlCode: string | any): Promise<IUrl | null> {
    return await Url.findOneAndUpdate({ urlCode }, { $inc: { clickCount: 1 } }, { new: true });
  }

  /**
   * @description Get URL Info
   * @Access Public access
   */
  public async getUrlById(id: string): Promise<IUrl | null> {
    return await Url.findById(id).lean();
  }

  /**
   * @description Get All URLs Info by Query
   * @Access User access - Protected
   */
  public async getUrlsByQuery(query: FilterQuery<IUrl>): Promise<IUrl[]> {
    return await Url.find(query as FilterQuery<IUrl>);
  }

  /**
   * @description Get One URL Info by Query
   * @Access User access - Protected
   */
  public async getUrlByQuery(query: FilterQuery<IUrl>): Promise<IUrl | null> {
    return await Url.findOne(query as FilterQuery<IUrl>);
  }

  /**
   * @description Create Short URL
   * @Access User access - Protected
   */
  public async createShortUrl(userId: string, url: { originalUrl: string }): Promise<IUrl> {
    return await Url.create({ userId, ...url });
  }

  /**
   * @description Update URL - User access only
   * @Access User access - Protected
   */
  public async findAndUpdateUrl(query: FilterQuery<IUrl>, update: UpdateQuery<IUrl>, options: QueryOptions) {
    return await Url.findOneAndUpdate(query, update, options);
  }

  /**
   * @description Delete URL - User access only
   * @Access User access - Protected
   */
  public async deleteUrl(urlCode: string | any): Promise<IUrl | null> {
    return await Url.findOneAndDelete({ urlCode });
  }
}
