import './App.css';
// import './registerServices';
// import './registerUseCase';
import { authUser, locale } from './useCases';
import { useObservableData } from './utils/useObservable';

function App() {
  const user = useObservableData(authUser.user$);
  const localeValue = useObservableData(locale.locale$);

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
