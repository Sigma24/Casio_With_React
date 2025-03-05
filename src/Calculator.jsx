  import React, { useState } from "react";
  import './Calculator.css'; 
  import leftarrow from './img/left-removebg-preview.png';
  import rightarrow from './img/right-removebg-preview.png';
  import down from './img/down-removebg-preview.png';
  import up from './img/up-removebg-preview.png';
  import ModeMenu from "./ModeMenu";
  import HypeMenu from "./HypMenu";
  import ShiftMenu from "./shift";
  import ConstMenu from "./const"


  function Calculator() {
    
    const [input, setInput] = useState('');
    const [showMenu, setShowMenu] = useState(false)
    const [selectedMode, setSelectedMode] = useState("Cmplx");
    const [showHypeMenu, setshowHypeMenu] = useState(false)
    const [shift , setshift] = useState(0)
    const [alpha , setalpha] = useState(0)
    const [shiftMenu, setshiftMenu] = useState(false)
    const [consmenu, setconsmenu] = useState(false)
    const [type, settype] = useState("degree")


function types (){
  switch(type){
    case "degree":
      settype("radian")
      break;
    case "radian":
      settype("gradian")
      break;
      
   case "gradian":
    settype("degree")  
    break; 

  }
}

let text;

switch(type){
  case "degree":
  text="DEG"
  break;
  case "radian":
    text = "RAD"
    break;
  case "gradian":
    text= "GRAD" 
    break; 

}







    function seven(){
      if (shift==1){
        setconsmenu(true)
      
      }
      else{
        setInput((inp)=>inp+"7")
      }

    }

  
    function toggleShift() {
      setshift((prevShift) => {
        if (prevShift === 0) {
          setalpha(0); 
          return 1;
        }
        return 0;
      });
    }
  function resetshift(){
      setshift(0)
  }



  function toggleAlpha() {
    setalpha((prevAlpha) => {
      if (prevAlpha === 0) {
        setshift(0); 
        return 1;
      }
      return 0;
    });
  }
  
function resetalpha(){
    setalpha(0)
}



let text_sa;
if(shift===1){
  text_sa="S"

}else if(alpha===1){
 
  text_sa="A"


}




  

  function selectmode(){
    if(shift===1){
      setShowMenu(false)
      setshiftMenu(true)

    }else{
         setShowMenu(true)
         setshiftMenu(false)
    }

    
  }


   


    return (
      <div className="calculatorContainer">
        <div className="mainView">
   
          <div className="textInputContainer">
            <textarea 
              className="textInput" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              rows="5"
            />
          </div>

         
          <div className="modeContainer">
            <button className="modeBtn" onClick={types}>{text}</button>
            <button className="modeBtn">GRAD</button>
            <button className="modeBtn3">{text_sa}</button>
            <button className="graphBtn">GRAPH</button>
          </div>

       
          <div className="upperGrid">
          
            <button className="shiftBtn" onClick={toggleShift} >Shift</button>
            <button className="alphaBtn" onClick={toggleAlpha}>Alpha</button>
            
            <button className="arrowBtn"><img src={leftarrow} alt="Left Arrow" className="icon" /></button>
            <button className="arrowBtn" ><img src={rightarrow} alt="Right Arrow" className="icon" /></button>
            <button className="modeBtn1"onClick={selectmode}>MODE</button>
           
      
 
            <button className="calcBtn">M+</button>

 
            <div>
              <p className="label">solve=</p>
              <button className="calcBtn">CALC</button>
            </div>
            <div>
              <p className="label">d/dx</p>
              <button className="calcBtn">∫<sup>x</sup><sub>y</sub></button>
            </div>
            <button className="arrowBtn1"><img src={up} alt="Up Arrow" className="icon" /></button>
            <button className="arrowBtn1"><img src={down} alt="Down Arrow" className="icon" /></button>
            <div>
              <p className="label">x!</p>
              <button className="calcBtn">x⁻¹</button>
            </div>
            <div>
              <p className="label">∑</p>
              <button className="calcBtn">log₂y</button>
            </div>

            {/* Row 3 */}
            <div>
              <p className="label">x y/z ÷R</p>
              <button className="calcBtn">x/y</button>
            </div>
            <div>
              <p className="label">x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mod</p>
              <button className="calcBtn">√x</button>
            </div>
            <div>
              <p className="label">x̅</p>
              <button className="calcBtn">x²</button>
            </div>
            <div>
              <p className="label">ⁿ√y</p>
              <button className="calcBtn">xʸ</button>
            </div>
            <div>
              <p className="label">10ˣ</p>
              <button className="calcBtn">Log</button>
            </div>
            <div>
              <p className="label">eˣ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t</p>
              <button className="calcBtn">Ln</button>
            </div>

            {/* Row 4 */}
            <div>
              <p className="label">∠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a</p>
              <button className="calcBtn">(-)</button>
            </div>
            <div>
              <p className="label3">FACT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b</p>
              <button className="calcBtn">° ' "</button>
            </div>
            <div>
              <p className="label">| x |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c</p>
              <button className="calcBtn" onClick={()=>setshowHypeMenu(true)}>hyp</button>
            </div>
            <div>
              <p className="label">cos⁻¹&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e</p>
              <button className="calcBtn">sin</button>
            </div>
            <div>
              <p className="label">sin⁻¹&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d</p>
              <button className="calcBtn">cos</button>
            </div>
            <div>
              <p className="label">tan⁻¹&nbsp;&nbsp;&nbsp;&nbsp;f</p>
              <button className="calcBtn">tan</button>
            </div>

            {/* Row 5 */}
            <div>
              <p className="label3">STO&nbsp;&nbsp;CLRv</p>
              <button className="calcBtn">RCL</button>
            </div>
            <div>
              <p className="label">i&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cot</p>
              <button className="calcBtn">ENG</button>
            </div>
            <div>
              <p className="label">%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cot⁻¹</p>
              <button className="calcBtn">(</button>
            </div>
            <div>
              <p className="label">,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x</p>
              <button className="calcBtn">)</button>
            </div>
            <div>
              <p className="label">x/y → y/z</p>
              <button className="calcBtn">S⇔D</button>
            </div>
            <div>
              <p className="label">M-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m</p>
              <button className="calcBtn">M+</button>
          
            </div>
           
          </div>
         
       

          {/* Lower Grid (4x5) */}
          <div className="lowerGrid">
            {/* Row 1 */}
            <div>
              <p className="label1">CONST</p>
              <button className="numberBtn" onClick={seven}>7</button>
            </div>
            <div>
              <p className="label1">CONV SI</p>
              <button className="numberBtn">8</button>
            </div>
            <div>
              <p className="label1">Limit</p>
              <button className="numberBtn">9</button>
            </div>
            <div>
              <p className="label1">&nbsp;</p>
              <button className="deleteBtn">⌫</button>
            </div>
            
            <div>
              <p className="label1">CLR ALL</p>
              <button className="deleteBtn">AC</button>
            </div>

            {/* Row 2 */}
            <div>
              <p className="label1">MATRIX</p>
              <button className="numberBtn">4</button>
            </div>
            <div>
              <p className="label1">VECTOR</p>
              <button className="numberBtn">5</button>
            </div>
            <div>
              <p className="label1">FNC HELP</p>
              <button className="numberBtn">6</button>
            </div>
            <div>
            <p className="label1">nCr&nbsp;&nbsp;&nbsp;GCD</p>

            <button className="operatorBtn">X</button>
            </div>
            
            <div>
            <p className="label1">nPr&nbsp;&nbsp;&nbsp;LCM</p>
            <button className="operatorBtn">÷</button>
            </div>
          

            {/* Row 3 */}
            <div>
              <p className="label1">STAT</p>
              <button className="numberBtn">1</button>
            </div>
            <div>
              <p className="label1">COMPLX</p>
              <button className="numberBtn">2</button>
            </div>
            <div>
              <p className="label1">DISTR</p>
              <button className="numberBtn">3</button>
            </div>
            <div>
              <p className="label1">Pol Cell</p>
              <button className="operatorBtn">+</button>
            </div>
            
            <div>
              <p className="label1">Rec Floor</p>
              <button className="operatorBtn">-</button>
            </div>

            {/* Row 4 */}
            <div>
              <p className="label1">copy paste </p>
              <button className="numberBtn">0</button>
            </div>
            <div>
              <p className="label1">&nbsp;Ran#RandInt</p>
              <button className="numberBtn">.</button>
            </div>
            <div>
              <p className="label1">π&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e</p>
              <button className="numberBtn">Exp</button>
            </div>
            <div>
            <p className="label1">Pre Ans</p>

              <button className="numberBtn">Ans</button>
              </div>

            <div>
            <p className="label1">HISTORY</p>
            <button className="equalsBtn">=</button>
            </div>
          </div>
        </div>
        {showMenu && (
        <div className="modeMenuContainer">
          <ModeMenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setSelectedMode={setSelectedMode} 
            shift={shift}
            reset={resetshift}
          />
        </div>
      )}

        {shiftMenu && (
        <div className="modeMenuContainer">
          <ShiftMenu
            showShiftMenu={shiftMenu}
            setShowShiftMenu={setshiftMenu}
            setSelectedMode={setSelectedMode} 
            shift={shift}
            resetshift={resetshift}
          />
        </div>
      )}
      


       {showHypeMenu && (
        <div className="modeMenuContainer">
          <HypeMenu
            showHypeMenu={showHypeMenu}
            setShowHypeMenu={setshowHypeMenu}
            setSelectedMode={setSelectedMode} 
          />
        </div>
      )}

{consmenu && (
        <div className="modeMenuContainer">
          <ConstMenu
            showConstMenu={consmenu}
            setShowConstMenu={setconsmenu}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift} 
          />
        </div>
      )}
         
    
      </div>
    );
  }

  export default Calculator;