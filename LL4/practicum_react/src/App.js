import './CSS/App.css';
import buildings from './data';
import Table from './components/Table';

function App() {
  return (
    <main className="app">
      <h3>Самые высокие здания и сооружения</h3>
      <Table
        data={buildings}
        amountRows={15}
        numPage={3}
        isPaginated={true}
      />
    </main>
  );
}

export default App;
