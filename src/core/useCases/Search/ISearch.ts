import { Observable } from "rxjs";
import { SearchState } from './SearchState'

export interface ISearch {
  results$: Observable<SearchState['results']>
  search(query: string): void;
}
