import { Observable } from 'rxjs'
import { AuthUserState } from '../AuthUser'

export interface ISearchGateway {
  search(query: string, userRole: NonNullable<AuthUserState['user']>['role']): Observable<{}[]>;
}
