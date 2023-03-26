import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '@/firebase/init';
export class StorageService {
  static async uploadFile(files: FileList) {
    return await uploadBytes(
      ref(storage, `listing_images/${files[0].name}`),
      await files[0].arrayBuffer()
    );
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
