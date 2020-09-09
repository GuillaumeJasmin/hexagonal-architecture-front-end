import { map, distinctUntilChanged } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { Store } from '../../utils/Store'
import { ILocale } from '../../useCases/Locale'
import { AuthUser } from '../AuthUser'
import { ISearch } from './ISearch'
import { SearchState } from './SearchState'
import { ISearchGateway } from './ISearchGateway'
import { assertsIsDefined } from '../../utils/assertions'

const initialState: SearchState = {
  searching: false,
  results: [],
}

export class Search extends Store<SearchState> implements ISearch {
  private plainResults$ = this.state$.pipe(map(state => state.results), distinctUntilChanged())

  results$ = combineLatest([this.plainResults$, this.locale.language$]).pipe(
    map(([plainResults, language]) => {
      return plainResults.filter(item => item.language === language)
    })
  )

  constructor(
    private gateway: ISearchGateway,
    private authUser: AuthUser,
    private locale: ILocale,
  ) {
    super(initialState)

    this.authUser.onLogout$.subscribe(() => {
      this.setState({ results: [] })
    })
  }

  search(query: string) {
    const userRole = this.authUser.getState().user?.role

    assertsIsDefined(userRole)

    this.setState({
      searching: true
    })

    this.gateway.search(query, userRole).subscribe(() => {
      // ...
    })
  }
}
