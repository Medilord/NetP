import './CSS/App.css';
import buildings from './data';
import Table from './components/Table';
import Sum from './components/sum';
import Select from "./components/masSelect";

function App() {
  return (
    <main className="app">
      <h3>Самые высокие здания и сооружения</h3>
      {/*<Sum></Sum>*/}
      <Select></Select>
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
