import { useState, useEffect} from 'react'
import '../App.css'
import { Button, Table} from "react-bootstrap";
import PlayerDropDown from './PlayerDropDown';

const positions = ['PG', 'SG', 'SF', 'PF', 'C'];


/*
      SAMPLE DATA
      PLAYERS WILL BE HERE, SUBJECT TO CHANGE WHEN THEY ARE DONE
*/
// const playersByPosition = {
//   PG: ['Stephen Curry', 'Chris Paul', 'Damian Lillard'],
//   SG: ['James Harden', 'Klay Thompson', 'Bradley Beal'],
//   SF: ['LeBron James', 'Kevin Durant', 'Kawhi Leonard'],
//   PF: ['Giannis Antetokounmpo', 'Anthony Davis', 'Jayson Tatum'],
//   C: ['Nikola Jokic', 'Joel Embiid', 'Rudy Gobert'],
// };

/*
      SAMPLE DATA
      PLAYERS WILL BE HERE, SUBJECT TO CHANGE WHEN THEY ARE DONE
*/
// const bestPlayers = {
//   PG: 'Stephen Curry',
//   SG: 'James Harden',
//   SF: 'LeBron James',
//   PF: 'Giannis Antetokounmpo',
//   C: 'Nikola Jokic',
// };



function App() {

  const [center, setCenter] = useState({});
  const [powerForward, setPowerForward] = useState({});
  const [pointGuard, setPointGuard] = useState({});
  const [shootingGuard, setShootingGuard] = useState({});
  const [smallForward, setSmallForward] = useState({});

  useEffect(() => {
    // Make a GET request to the FastAPI endpoint
    fetch('http://localhost:8000/center')
      .then(res => res.json())
      .then(data => {
        setCenter(data);
      })
      .catch(error => console.error('Error:', error));
  }, [center]);

  useEffect(() => {
  // Make a GET request to the FastAPI endpoint
  fetch('http://localhost:8000/power-forward')
    .then(response => response.json())
    .then(data => {
      setPowerForward(data);
    })
    .catch(error => console.error('Error:', error));
}, [powerForward]);

useEffect(() => {
  // Make a GET request to the FastAPI endpoint
  fetch('http://localhost:8000/point-guard')
    .then(response => response.json())
    .then(data => {
      setPointGuard(data);
    })
    .catch(error => console.error('Error:', error));
}, [pointGuard]);

useEffect(() => {
  // Make a GET request to the FastAPI endpoint
  fetch('http://localhost:8000/shooting-guard')
    .then(response => response.json())
    .then(data => {
      setShootingGuard(data);
    })
    .catch(error => console.error('Error:', error));
}, [shootingGuard]);

useEffect(() => {
  // Make a GET request to the FastAPI endpoint
  fetch('http://localhost:8000/small-forward')
    .then(response => response.json())
    .then(data => {
      setSmallForward(data);
    })
    .catch(error => console.error('Error:', error));
}, [smallForward]);


  const playersByPosition = {
    PG: Object.keys(pointGuard || {}),
    SG: Object.keys(shootingGuard || {}),
    SF: Object.keys(smallForward || {}),
    PF: Object.keys(powerForward || {}),
    C: Object.keys(center || {}),
  };

  const maxPG = Object.keys(pointGuard).length > 0 
  ? Object.entries(pointGuard).reduce((max, entry) => 
      entry[1] > max[1] ? entry : max
    ) 
  : null;

  const maxSG = Object.keys(shootingGuard).length > 0 
  ? Object.entries(shootingGuard).reduce((max, entry) => 
      entry[1] > max[1] ? entry : max
    ) 
  : null;

  const maxCenter = Object.keys(center).length > 0 
  ? Object.entries(center).reduce((max, entry) => 
      entry[1] > max[1] ? entry : max
    ) 
  : null;

  const maxPF = Object.keys(powerForward).length > 0 
  ? Object.entries(powerForward).reduce((max, entry) => 
      entry[1] > max[1] ? entry : max
    ) 
  : null;

  const maxSF = Object.keys(smallForward).length > 0 
  ? Object.entries(smallForward).reduce((max, entry) => 
      entry[1] > max[1] ? entry : max
    ) 
  : null;

  const bestPlayers = {
    PG: maxPG,
    SG: maxSG,
    SF: maxSF,
    PF: maxPF,
    C: maxCenter,
  }


  const [selectedPlayers, setSelectedPlayers] = useState({
    PG: '',
    SG: '',
    SF: '',
    PF: '',
    C: '',
  });

  const [showComparison, setShowComparison] = useState(false);

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

  const updateSelectedPlayers = (pos, e) => {
    setSelectedPlayers(prev => ({
      ...prev,
      [pos]: e.target.text,
    }));
  };

  return (
    
    
    <div>
      <h1>NBA Player Comparison</h1>
      {!showComparison ? (
        <div>
          {positions.map((pos) => (
            <div key={pos} style={{ marginBottom: '10px' }}>
              <label>
                
                {pos}: <PlayerDropDown onClick = {(e) => {
                  updateSelectedPlayers(pos, e);
                }
                }{...playersByPosition[pos]}></PlayerDropDown>

              </label>
            </div>
          ))}
          <Button onClick={handleCompare} variant="success">
            Compare
          </Button>
        </div>
      ) : (
        <div>
          <h2>Comparison Results</h2>

            <p>0 - 200 is a pretty bad player</p>
            <p>200 - 500 is an average NBA player</p>
            <p>500+ is all-star level talent</p>

          <Table variant="dark" align='center'>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Position</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Your Pick</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Better Player</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos) => (
                <tr key={pos}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{pos}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{selectedPlayers[pos]}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{bestPlayers[pos]}</td>
                </tr>
                
              ))}
            </tbody>
          </Table>
          <Button
            onClick={() => {
              setShowComparison(false);
              setSelectedPlayers({
                PG: '',
                SG: '',
                SF: '',
                PF: '',
                C: '',
              });}
            }
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

