interface IImage {
  id: string;
  size: number;
  uploadedAt: Date;
  mimeType: string;
  originalName: string;
  generatedName: string;
}


export default IImage;
