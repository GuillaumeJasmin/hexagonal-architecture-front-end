import { Container } from 'typedi';
import { authenticationToken } from './IAuthentication';

export function getAuthentication() {
  return Container.get(authenticationToken);
}