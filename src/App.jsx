import './App.css';
import { useEffect, useState } from 'react';
import orang from './asets/orang.png';
import gajah from './asets/gajah.png';
import semut from './asets/semut.png';


function App() {
  const [computer, setComputer] = useState('orang');
  const [player, setPlayer] = useState('orang');
  const [result, setResult] = useState('');
  const [pointComputer, setPointComputer] = useState(0);
  const [pointPlayer, setPointPlayer] = useState(0);
  const [src, setSrc] = useState(orang);
  const [keterangan, setKeterangan] = useState('');
  const [pemenang, setPemenang] = useState('SIAP MENANG?');

  const handleComputer = () => {
    const acak = Math.random();
    let pilih;
    if(acak < 0.34) {
      pilih = 'gajah';
      setSrc(gajah)
    };
    if(acak >= 0.34 && acak < 0.67) {
      pilih = 'orang';
      setSrc(orang)
    };
    if(acak >= 0.67) {
      pilih = 'semut';
      setSrc(semut)
    };
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
    if(computer === player) hasil = 'seri'
    else if(player === 'orang') hasil = (computer === 'semut' ? 'menang' : 'kalah')
    else if(player === 'gajah') hasil = (computer === 'orang' ? 'menang' : 'kalah')
    else if(player === 'semut') hasil = (computer === 'gajah' ? 'menang' : 'kalah');
    setResult(hasil)
  }

  const handlePoint = () => {
    console.log(result)
    let resComp = pointComputer;
    resComp++
    let resPlayer= pointPlayer;
    resPlayer++
    if(result === 'kalah') {
      setPointComputer(resComp);
      setKeterangan('KALAH! 1 POIN UNTUK LAWAN');
    }
    if(result === 'menang') {
      setPointPlayer(resPlayer);
      setKeterangan('MENANG! 1 POIN UNTUK KAMU');
    }
    if(result === 'seri') {
      setKeterangan('SERI!');
    }
  }

  const handlePemenang = () => {
    if(pointPlayer === 5) {
      setPemenang('ANDA MENANG');
    }
    if(pointComputer === 5) {
      setPemenang('ANDA KALAH')
    }
    if(pointComputer === pointPlayer && pointComputer >= 5 && pointPlayer >= 5) {
      setPemenang('SERI')
    }
  }

  const handleReset = () => {
    setPointComputer(0);
    setPointPlayer(0);
    setPemenang('SIAP MENANG?')
  }

  useEffect(() => {
    handleResult();
  }, [player, computer])

  useEffect(() => {
    handlePoint();
  }, [result])
  
  useEffect(() => {
    handlePemenang();
  }, [pointComputer, pointPlayer])
  
  return (
    <div className="app">
        <h1>Suit Jawa</h1>
        <div className="papanBermain">
          <div className="computer vs">
            <h3>COMPUTER</h3>
            <img src={src} alt="" />
          </div>
          <div className="result">
            <div className="result__hasil">
              <h5>{keterangan}</h5>
            </div>
            <div className="result__skor">
              <div className="skor__player">
                <h5>POINT KAMU</h5>
                <h4>{pointPlayer}</h4>
              </div>
              <div className="skor__computer">
                <h5>POINT COMPUTER</h5>
                <h4>{pointComputer}</h4>
              </div>
            </div>
            <div className="result__pemenang">
              <h3>{pemenang}</h3>
              <p>Dapatkan 5 point untuk memenangkan permainan ini</p>
            </div>
          </div>
          <div className="players vs" >
            <div className="players__list">
            <div className="player" onClick={() => {
              handleComputer(); 
              handleOrang();
              }}>
                <img src={orang} alt="" />
              </div>
              <div className="player" onClick={() => {
              handleComputer(); 
              handleGajah();
              }}>
                <img src={gajah} alt="" />
              </div>
              <div className="player" onClick={() => {
              handleComputer(); 
              handleSemut();
              }}>
                <img src={semut} alt="" />
              </div>
            </div>
            <h4>KAMU</h4>
          </div>
          <button onClick={handleReset}>reset</button>
        </div>



        {/* <button onClick={handlePoint} >kklkkl</button> */}
      {/* <Container>
        <Row className="baris justify-content-md-center">
          <Col className='kolom' lg='8'>
            <h1 className='text-center'> SUIT JAWA</h1>
            <Container>
              <Row className="justify-content-md-center">
                <Col lg='8'>
                  <h3>Computer</h3>
                  <h3>hasil</h3>
                  <h3>Player</h3>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container> */}

    </div>
  );
}

export default App;
