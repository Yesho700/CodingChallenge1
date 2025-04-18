export default interface PhotoInter {
    publicId: string;
    url: string;
    caption?: string;
    userId: number;
    width?: number;
    height?: number;
    format?: string;
  }