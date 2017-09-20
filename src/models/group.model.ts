import { User } from '../services/user-manager';
import { Video } from './video.model';

export interface IGroup {
  name:string
  members:User[]
  photoURL:string
  playlist:Video[]
}
