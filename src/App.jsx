import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [computer, setComputer] = useState('orang');
  const [player, setPlayer] = useState('orang');
  const [result, setResult] = useState('');

  const handleComputer = () => {
    const acak = Math.random();
    let pilih;
    if(acak < 0.34) pilih = 'gajah';
    if(acak >= 0.34 && acak < 0.67) pilih = 'orang';
    if(acak >= 0.67) pilih = 'semut';
    setComputer(pilih)
  }

  const handleOrang = () => {
    setPlayer('orang')
  }

  const handleGajah = () => {
    setPlayer('gajah')
  }

  const handleSemut = () => {
    setPlayer('semut')
  }

  const handleResult = () => {
    let hasil;
    console.log(player, computer)
    if(computer === player) hasil = 'seri'
    else if(player === 'orang') hasil = (computer === 'semut' ? 'menang' : 'kalah')
    else if(player === 'gajah') hasil = (computer === 'orang' ? 'menang' : 'kalah')
    else if(player === 'semut') hasil = (computer === 'gajah' ? 'menang' : 'kalah');
    setResult(hasil)
  }

  useEffect(() => {
    handleResult()
  }, [player, computer])


  // let hasil;
  //   if(computer === player) hasil = 'seri';
  //   if(player === 'orang') hasil = (computer === 'semut' ? 'menang' : 'kalah');
  //   if(player === 'gajah') hasil = (computer === 'orang' ? 'menang' : 'kalah');
  //   if(player === 'semut') hasil = (computer === 'gajah' ? 'menang' : 'kalah');
  //   setResult(hasil)

  
  return (
    <div className="App">
      <h1>Game Suit Jawa</h1>
      <h2>{result}</h2>
      <h3>{computer}</h3>
      <button onClick={() => {
        handleComputer(); 
        handleOrang();
        }}>orang</button>
      <button onClick={() => {
        handleComputer(); 
        handleGajah();
        }}>Gajah</button>
      <button onClick={() => {
        handleComputer(); 
        handleSemut();
        }}>Semut</button>
    </div>
  );
}

export default App;
