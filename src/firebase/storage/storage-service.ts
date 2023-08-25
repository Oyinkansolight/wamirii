import {
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';

import { storage } from '@/firebase/init';
export class StorageService {
  static async uploadFile(
    files: FileList,
    folder?: string
  ): Promise<{ uploadResult: UploadResult; publicURL?: string }> {
    const upload = await uploadBytes(
      ref(storage, `${folder ?? 'listing_images'}/${files[0].name}`),
      await files[0].arrayBuffer()
    );

    return {
      uploadResult: upload,
      publicURL: await getDownloadURL(ref(storage, upload.ref.fullPath)),
    };
  }

  static async getFileLink(path: string) {
    return getDownloadURL(ref(storage, path));
  }

  static getRef(path?: string) {
    if (path) {
      return ref(storage, path);
    }
  }
}
