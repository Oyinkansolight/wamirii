import { Timestamp } from 'firebase/firestore';

export default interface ListingsGroup {
  date: Timestamp;
  format: string;
}
