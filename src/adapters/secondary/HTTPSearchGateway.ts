import { from } from 'rxjs'
import { ISearchGateway } from 'src/core/useCases/Search'
import { HTTP } from './HTTP'

export class HTTPSearchGateway extends HTTP implements ISearchGateway {
  search() {
    // to implement
    return from(
      Promise.resolve([])
    )
  }
}
