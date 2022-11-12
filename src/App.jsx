import './App.css';
import { useEffect, useState } from 'react';
import orang from './asets/orang.png';
import gajah from './asets/gajah.png';
import semut from './asets/semut.png';
import swal from '@sweetalert/with-react';
import { Button } from 'react-bootstrap';

function App() {
  const [computer, setComputer] = useState('orang');
  const [player, setPlayer] = useState('orang');
  const [result, setResult] = useState('');
  const [pointComputer, setPointComputer] = useState(0);
  const [pointPlayer, setPointPlayer] = useState(0);
  const [srcComp, setSrcComp] = useState(orang);
  const [srcPlayer, setSrcPlayer] = useState(orang);
  const [keterangan, setKeterangan] = useState('');
  const [pemenang, setPemenang] = useState('SIAP MENANG?');

  const handleComputer = () => {
    const acak = Math.random();
    let pilih;
    if(acak < 0.34) {
      pilih = 'gajah';
      setSrcComp(gajah)
    };
    if(acak >= 0.34 && acak < 0.67) {
      pilih = 'orang';
      setSrcComp(orang)
    };
    if(acak >= 0.67) {
      pilih = 'semut';
      setSrcComp(semut)
    };
    setComputer(pilih)
  }

  const handleOrang = () => {
    setPlayer('orang');
    setSrcPlayer(orang);
  }

  const handleGajah = () => {
    setPlayer('gajah');
    setSrcPlayer(gajah);
  }

  const handleSemut = () => {
    setPlayer('semut');
    setSrcPlayer(semut);
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
    let resComp = pointComputer;
    resComp++
    let resPlayer= pointPlayer;
    resPlayer++
    if(result === 'kalah') {
      setPointComputer(resComp);
      setKeterangan('KALAH! POIN UNTUK LAWAN');
    }
    if(result === 'menang') {
      setPointPlayer(resPlayer);
      setKeterangan('MENANG! POIN UNTUK KAMU');
    }
    if(result === 'seri') {
      setKeterangan('SERI! POIN TETAP');
    }
  }

  // const handlePemenang = () => {
  //   if(pointPlayer === 5) {
  //     setPemenang('ANDA MENANG');
  //   }
  //   if(pointComputer === 5) {
  //     setPemenang('ANDA KALAH');
  //   }
  //   if(pointComputer === pointPlayer && pointComputer >= 5 && pointPlayer >= 5) {
  //     setPemenang('SERI')
  //   }
  // }

    const handlePemenang = () => {
    if(pointPlayer === 5) {
      swal(
        <div>
          <h1>Selamat kamu MENANG</h1>
          <p>
            Coba lagi?
          </p>
        </div>
      );
      setPointComputer(0);
      setPointPlayer(0);
    }
    if(pointComputer === 5) {
      swal(
        <div>
          <h1>Yahhh, kamu KALAH</h1>
          <p>
            Coba lagi?
          </p>
        </div>
      );
      setPointComputer(0);
      setPointPlayer(0);
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
        <h1>SUIT JAWA</h1>
        <div className="content">
          <div className="content__vs">
            <h2>VS</h2>
            <div className="tandings">
              <div className="tanding">
                <h4>KAMU</h4>
                <img src={srcPlayer} alt="" />
              </div>
              <div className="tanding">
                <h4>COMPUTER</h4>
                <img src={srcComp} alt="" />
              </div>
            </div>
            <div className="result__hasil">
              <h4>{keterangan}</h4>
            </div>
          </div>

          <div className="result">
            <h4>POIN</h4>
            <div className="result__skor">
              <div className="skor__player">
                <h4>KAMU</h4>
                <h4>{pointPlayer}</h4>
              </div>
              <div className="skor__computer">
                <h4>COMPUTER</h4>
                <h4>{pointComputer}</h4>
              </div>
            </div>
            <div className="result__pemenang">
              <p>Dapatkan 5 poin untuk memenangkan permainan!</p>
            </div>
          </div>
          <div className="pilihPlayer" >
            
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
            <h4>PILIH!</h4>
          </div>
          <Button className='button__reset' variant='danger' onClick={handleReset}>Reset Poin</Button>
        </div>
      </div>
  );
}

export default App;
