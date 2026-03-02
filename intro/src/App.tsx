import Listing from './Components/Listing'
import offers from './data/etsy.js';

function App() {
  return (
    <div className="App">
      <Listing items={offers} />
    </div>
  );
}
export default App;
