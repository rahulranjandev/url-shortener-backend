import mongoose, { Document, Schema } from 'mongoose';
import { HOST_URL } from '@config';
import generateUniqueUrlCode from '@utils/slugify';

interface IUrl extends Document {
  userId: mongoose.Types.ObjectId;
  originalUrl: string;
  shortUrl?: string;
  urlCode?: string;
  clickCount?: number;
}

const urlSchema = new mongoose.Schema<IUrl>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalUrl: {
      type: String,
      required: [true, 'Please provide a long URL'],
    },
    shortUrl: {
      type: String,
      unique: true,
      sparse: true,
    },
    urlCode: {
      type: String,
      unique: true,
      sparse: true,
      minlength: [5, 'Please provide a URL code of at least 5 characters'],
      maxlength: [10, 'Please provide a URL code of at most 10 characters'],
    },
    clickCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

urlSchema.pre<IUrl>('save', function (next) {
  if (!this.urlCode) {
    this.urlCode = generateUniqueUrlCode(4, 'hex');
  }
  if (!this.shortUrl) {
    this.shortUrl = `${HOST_URL}/${this.urlCode}`;
  }
  next();
});

const Url = mongoose.model<IUrl>('Url', urlSchema);

export { Url, IUrl };
