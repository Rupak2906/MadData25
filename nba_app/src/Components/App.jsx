import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

import { Button, Table} from "react-bootstrap";

import Dropdown from 'react-bootstrap/Dropdown';

const positions = ['PG', 'SG', 'SF', 'PF', 'C'];

const playersByPosition = {
  PG: ['Stephen Curry', 'Chris Paul', 'Damian Lillard'],
  SG: ['James Harden', 'Klay Thompson', 'Bradley Beal'],
  SF: ['LeBron James', 'Kevin Durant', 'Kawhi Leonard'],
  PF: ['Giannis Antetokounmpo', 'Anthony Davis', 'Jayson Tatum'],
  C: ['Nikola Jokic', 'Joel Embiid', 'Rudy Gobert'],
};

const bestPlayers = {
  PG: 'Stephen Curry',
  SG: 'James Harden',
  SF: 'LeBron James',
  PF: 'Giannis Antetokounmpo',
  C: 'Nikola Jokic',
};

function App() {
  const [selectedPlayers, setSelectedPlayers] = useState({
    PG: '',
    SG: '',
    SF: '',
    PF: '',
    C: '',
  });

  const [showComparison, setShowComparison] = useState(false);

  const handleChange = (position, event) => {
    setSelectedPlayers({
      ...selectedPlayers,
      [position]: event.target.value,
    });
  };

  const handleCompare = () => {
    // Ensure that a player is selected for every position
    for (let pos of positions) {
      if (!selectedPlayers[pos]) {
        alert(`Please select a player for ${pos}`);
        return;
      }
    }
    setShowComparison(true);
  };

  const [selected, setSelected] = useState("Select an option");
  
  const options = ["Option 1", "Option 2", "Option 3"];

  //Hide the visibility of other elts
  // const switch_visibility = () => {

  // }

  return (
    
    
    <div >

      <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {selected}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => setSelected(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>


      <h1>NBA Player Comparison</h1>
      {!showComparison ? (
        <div>
          {positions.map((pos) => (
            <div key={pos} style={{ marginBottom: '10px' }}>
              <label>
                {pos}:
                <select
                  value={selectedPlayers[pos]}
                  onChange={(e) => handleChange(pos, e)}
                  style={{ marginLeft: '10px', padding: '5px' }}
                >
                  <option value="">Select a player</option>
                  {playersByPosition[pos].map((player) => (
                    <option key={player} value={player}>
                      {player}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
          <Button onClick={handleCompare}>
            Compare
          </Button>
        </div>
      ) : (
        <div>
          <h2>Comparison Results</h2>
          <Table>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Position</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Your Pick</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Best Player</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => (
                <tr key={pos}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pos}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{selectedPlayers[pos]}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{bestPlayers[pos]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            onClick={() => setShowComparison(false)}
            style={{ marginTop: '20px', padding: '10px 15px', cursor: 'pointer' }}
          >
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}




export default App
