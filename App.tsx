import NavigationLinks from './App/NavigationLinks/NavigationLinks';
import { AppProvider } from './App/context/AppContext';


export default function App() {
  return (
    <AppProvider>
    <NavigationLinks/>
    </AppProvider>
  );
}