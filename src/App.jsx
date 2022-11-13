import './App.css';
import { useEffect, useState } from 'react';
import orang from './asets/orang.png';
import gajah from './asets/gajah.png';
import semut from './asets/semut.png';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import Loading from './components/Loading/Loading';
import LoadingKeterangan from './components/Loading/LoadingKeterangan';

function App() {
  const [computer, setComputer] = useState('orang');
  const [player, setPlayer] = useState('orang');
  const [pointComputer, setPointComputer] = useState(0);
  const [pointPlayer, setPointPlayer] = useState(0);
  const [srcComp, setSrcComp] = useState(orang);
  const [srcPlayer, setSrcPlayer] = useState(orang);
  const [keterangan, setKeterangan] = useState('');
  const [klik, setKlik] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingKeterangan, setLoadingKeterangan] = useState(false);

  const handleComputer = () => {
    setLoading(true);
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
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    setComputer(pilih);
    setKlik(klik+1)
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
    setLoadingKeterangan(true);
    let hasil;
    if(computer === player) hasil = 'seri'
    else if(player === 'orang') hasil = (computer === 'semut' ? 'menang' : 'kalah')
    else if(player === 'gajah') hasil = (computer === 'orang' ? 'menang' : 'kalah')
    else if(player === 'semut') hasil = (computer === 'gajah' ? 'menang' : 'kalah');

    if(hasil === 'kalah') {
      setTimeout(() => {
        setLoadingKeterangan(false)
        setPointComputer(pointComputer+1);
      }, 2000)
      setKeterangan('KALAH! POIN UNTUK COMPUTER');
    }
    if(hasil === 'menang') {
      setTimeout(() => {
        setLoadingKeterangan(false)
        setPointPlayer(pointPlayer+1);
      }, 2000)
      setKeterangan('MENANG! POIN UNTUK KAMU');
    }
    if(hasil === 'seri') {
      setTimeout(() => {
        setLoadingKeterangan(false)
      }, 2000)
      setKeterangan('SERI! POIN TETAP');
    }
  }

  const handlePemenang = () => {
    if(pointPlayer === 5) {
      // swal(
      //   <div className='alert__pemenang'>
      //     <div className="result__skor pemenang__skor">
      //       <div className="skor__player">
      //         <h4>KAMU</h4>
      //         <h4>{pointPlayer}</h4>
      //       </div>
      //       <div className="skor__computer">
      //         <h4>COMPUTER</h4>
      //         <h4>{pointComputer}</h4>
      //       </div>
      //     </div> <br />
      //     <h1>Wahhh, selamat kamu MENANG</h1>
      //     <p>
      //       Coba lagi?
      //     </p>
      //   </div>
      // );
      swal("Wahhh, selamat Kamu MENANG", "Lagi?");
      
      setPointComputer(0);
      setPointPlayer(0);
    }
    if(pointComputer === 5) {
      // swal(
      //   <div className='alert__pemenang'>
      //     <div className="result__skor pemenang__skor">
      //       <div className="skor__player">
      //         <h4>KAMU</h4>
      //         <h4>{pointPlayer}</h4>
      //       </div>
      //       <div className="skor__computer">
      //         <h4>COMPUTER</h4>
      //         <h4>{pointComputer}</h4>
      //       </div>
      //     </div> <br />
      //     <h1>Yahhh, kamu KALAH</h1>
      //     <p>
      //       Coba lagi?
      //     </p>
      //   </div>
      // );
      swal("Yahhh, Kamu KALAH", "Coba agi?");
      
      setPointComputer(0);
      setPointPlayer(0);
    }
  }

  const handleReset = () => {
    setPointComputer(0);
    setPointPlayer(0);
  }

  useEffect(() => {
    handleResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [klik]);
  
  useEffect(() => {
    handlePemenang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointComputer, pointPlayer]);

  // const atur = () => {
  //   swal(
  //     <div className='alert__pemenang'>
  //       <div className="result__skor pemenang__skor">
  //         <div className="skor__player">
  //           <h4>KAMU</h4>
  //           <h4>{pointPlayer}</h4>
  //         </div>
  //         <div className="skor__computer">
  //           <h4>COMPUTER</h4>
  //           <h4>{pointComputer}</h4>
  //         </div>
  //       </div> <br />
  //       <h1>Wahhh, selamat kamu MENANG</h1>
  //       <p>
  //         Coba lagi?
  //       </p>
  //     </div>
  //   );
  // }

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
                {
                  loading? <Loading /> : <img src={srcComp} alt="" />
                }
              </div>
            </div>
            <div className="result__hasil">
              {
                  loadingKeterangan? <LoadingKeterangan /> : <h4>{keterangan}</h4>
                }
            </div>
          </div>

          <div className="result">
            {/* <h4>POIN</h4> */}
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
              <p>Dapatkan 5 poin untuk menangkan permainan!</p>
            </div>
          </div>
          <div className="pilihPlayer" >
            
            <div className="players__list">
              <div className="player player__orang" onClick={() => {
                handleComputer(); 
                handleOrang();
                }}>
                  <img src={orang} alt="" />
                </div>
                <div className="player player__gajah" onClick={() => {
                handleComputer(); 
                handleGajah();
                }}>
                  <img src={gajah} alt="" />
                </div>
                <div className="player player__semut" onClick={() => {
                handleComputer(); 
                handleSemut();
                }}>
                  <img src={semut} alt="" />
                </div>
            </div>
            <h4>PILIH!</h4>
          </div>
          <Button onClick={handleReset} className='button__reset' variant='danger'>Reset Poin</Button>
          {/* <Button onClick={atur}>atur</Button> */}
        </div>
      </div>
  );
}

export default App;
