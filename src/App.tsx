import './App.css';
// import './registerServices';
// import './registerUseCase';
import { authUser, locale } from './useCases';
import { useObservable } from './utils/useObservable';

function App() {
  const user = useObservable(authUser.user$);
  // const localeValue = useObservable(locale.locale$);
  const localeValue = useObservable(authUser.locale$);

  return (
    <div>
      {user && (
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      )}
      <div>Locale {localeValue}</div>
      <button
        onClick={() => locale.setLocale(localeValue === 'en' ? 'fr' : 'en')}
      >
        Change locale
      </button>
      <button onClick={() => authUser.fetchUser()}>Fetch user</button>
    </div>
  );
}

export default App;
