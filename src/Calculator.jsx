  import React, { useState,useEffect } from "react";
  import './Calculator.css'; 
  import leftarrow from './img/left-removebg-preview.png';
  import rightarrow from './img/right-removebg-preview.png';
  import down from './img/down-removebg-preview.png';
  import up from './img/up-removebg-preview.png';
  import ModeMenu from "./ModeMenu";
  import HypeMenu from "./HypMenu";
  import ShiftMenu from "./shift";
  import ConstMenu from "./const"
  import Graph from "./graph";
  import ConvBtnMenu from "./conv";
  import  MatrixShift from "./matrix"
  import BaseShift from "./base_n";
  import CmplxShift from "./cmplx";
  import StatsShift from "./stats";
  import VectorShift from "./vector";
  import { useRef } from "react";
import { evaluateExpression } from "./eval";
import HistoryManager from "./History";
import HistoryList from "./history_UI";

  function Calculator() {
    
    const [input, setInput] = useState('');
    const [answer, setanswer] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const [showMenu, setShowMenu] = useState(false)
    const [selectedMode, setSelectedMode] = useState("MATH");
    const [showHypeMenu, setshowHypeMenu] = useState(false)
    const [shift , setshift] = useState(0)
    const [alpha , setalpha] = useState(0)
    const [shiftMenu, setshiftMenu] = useState(false)
    const [consmenu, setconsmenu] = useState(false)
    const [type, settype] = useState("degree")
    const[graph , setgraph]=useState(false)
    const [convmenu, setconvmenu] = useState(false)
    const [matrix, setmatrix] = useState(false)
    const [vector, setvctor] = useState(false)
    const [base, setbase] = useState(false)
    const [cmplx, setcmplx] = useState(false)
    const [stat, setstat] = useState(false)
    const textAreaRef = useRef(null);
    const [selectedmatData, setSelectedmatData] = useState(""); 
    const [selectedvectData, setSelectedvectData] = useState(""); 
    const[hyp,sethyp]=useState("")
    const [dmsMode, setDmsMode] = useState(false);
const [originalDecimal, setOriginalDecimal] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);



let modebtntext="Math";
switch(selectedMode){
  case "MATRIX":
    modebtntext="Mat"
    break;
  case "CMPLX":
    modebtntext="Cmlx"
    break;

  case "BASEN":
    modebtntext="Base_n"
    break;
  case "STATISTICS":
    modebtntext="Stat"
    break;
  case "EQUATION":
    modebtntext="Equ"
    break;
  case "TABLE":
    modebtntext="Table"
    break;
  case "VECTOR":
    modebtntext="vect"
    break;          
      
} 


  useEffect(() => {
    if (showHistory) {
      const stored = HistoryManager.getAllHistory();
      setHistoryItems(stored);
    }
  }, [showHistory]);


function plus(){
setInput((inp)=>inp+'+')
}


function mins(){
setInput((inp)=>inp+'-')
}


function mul(){
setInput((inp)=>inp+'×')
}


function div(){
setInput((inp)=>inp+'÷')
}


function hell(){
  alert("hell")
}
    
    function closebracl(){
  setInput((inp)=>inp+')')
}

 function openbrack(){
  setInput((inp)=>inp+'(')
 }




    const handleChange = (e) => {
      setInput(e.target.value);
      setCursorPosition(e.target.selectionStart);
  };

 
  const cursor = (direction) => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    textArea.focus();

    const textBeforeCursor = input.slice(0, cursorPosition);
    const lines = textBeforeCursor.split('\n');
    const currentLineIndex = lines.length - 1;
    const currentLinePosition = lines[currentLineIndex].length;

    if (direction === 'left' && cursorPosition > 0) {
        setCursorPosition((prev) => prev - 1);
    } 
    else if (direction === 'right' && cursorPosition < input.length) {
        setCursorPosition((prev) => prev + 1);
    }
    else if (direction === 'up') {
        const prevLineLength = lines[currentLineIndex - 1]?.length || 0;
        setCursorPosition(cursorPosition - currentLinePosition - 1 - prevLineLength);
    }
    else if (direction === 'down') {
        const remainingText = input.slice(cursorPosition);
        const nextLineLength = remainingText.split('\n')[0]?.length || 0;
        setCursorPosition(cursorPosition + nextLineLength + 1);
    }
};


useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
        textArea.focus();
        textArea.setSelectionRange(cursorPosition, cursorPosition);
    }
}, [cursorPosition]);














const MatrixDataSelect = (item) => {
  setInput((inp) => inp + item); 
  setSelectedmatData(item);
};

const vectorDataSelect = (item) => {
  setInput((inp) => inp + item); 
  setSelectedvectData(item);
};




   


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

  function nine(){
  setInput((inp)=>inp+'9')
}


function eight(){
  if (shift==1){
    setconvmenu(true)
  }
  else{
    setInput((inp)=>inp+'8')
  }
}  


function four(){
  if (shift==1&&selectedMode==="MATRIX"){
    setmatrix(true)
  }
  else{
    setInput((inp)=>inp+'4')
  }
} 

function six(){
  setInput((inp)=>inp+'6')
}

function five(){
  if (shift==1&&selectedMode==="VECTOR"){
    setvctor(true)
    
  }
  else{
    setInput((inp)=>inp+'5')
  }
} 



function two(){
  if (shift==1&&selectedMode==="CMPLX"){
    setcmplx(true)

  }
  else{
    setInput((inp)=>inp+'2')
  }
} 

function one(){
  if (shift==1&&selectedMode==="STATISTICS"){
    setstat(true)
  }
  else{
    setInput((inp)=>inp+'1')
  }
} 

function zero(){
  setInput((inp)=>inp+'0')
}



function three(){
  if (shift==1&&selectedMode==="BASEN"){
    setbase(true)
  }
  else{
    setInput((inp)=>inp+'3')
  }
} 

function cut(){
  setInput((inp)=>(inp.slice(0,-1)))
  if(!input){
    setanswer(" ")
  }
}

function clr(){
  setInput(" ")
  setanswer(" ")
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


function sin(){
   if(shift===1){
    setInput(inp=>inp+"arcsin(")
   }
   else{
      setInput(inp=>inp+"sin(")
   }
}

function cos(){
   if(shift===1){
    setInput(inp=>inp+"arccos(")
   }
   else{
      setInput(inp=>inp+"cos(")
   }
}




function tan(){
   if(shift===1){
    setInput(inp=>inp+"arctan(")
   }
   else{
      setInput(inp=>inp+"tan(")
   }
}

function integration(){
  if(shift===1){
    setInput(inp=>inp+ "d/dx(f(x),x)->(")
  }else
  {
        setInput(inp => inp + "∫(u,l,f(x))dx-> (");

  }
}

function fraction()
{
  if(shift===1){
    setInput(inp=>inp+ "x y/z->(")
  }else
  {
        setInput(inp => inp + "x/y ->(");

  }
}

function dms() {
  if (answer) {
    if (typeof answer === 'number' && !dmsMode) {
      // Convert decimal to DMS
      const decimal = answer;
      const degrees = Math.floor(decimal);
      const minutesDecimal = (decimal - degrees) * 60;
      const minutes = Math.floor(minutesDecimal);
      const seconds = Math.round((minutesDecimal - minutes) * 60);

      setOriginalDecimal(answer);
      setanswer(`${degrees}°${minutes}'${seconds}"`);
      setDmsMode(true);

    } else if (dmsMode && originalDecimal !== null) {
      // Revert back to decimal
      setanswer(originalDecimal);
      setDmsMode(false);
    }

  } else {
    // No answer exists, so just append the degree symbol to input
    setInput(inp => inp + "°");
  }
}

function inverse(){
  if(shift===1){
    setInput(inp=>inp+"!")
  }
  else{
    setInput(inp=>inp+"x⁻¹->(")
  }
}

function log (){
   setInput(inp=>inp+"Log(")
}

function nln(){
  setInput(inp=>inp+"ln(")
}

function evaluate(){
  if (shift===1){
   
     setShowHistory(true);
      return;
      
    
  }
  setshift(0)
  
  if(input){
   
      const result = evaluateExpression(input,type); 
      setanswer(result);

      const expressionWithResult = `${input} = ${result}`;
      HistoryManager.addHistory(expressionWithResult);
  
  }
  
}


function root(){
  setInput(inp=>inp+'√x->(')

}

function power(){
  setInput(inp=>inp+"^2")
}

function doublepower(){
  setInput(inp=>inp+"xʸ->(")
}

  function handleDeleteHistoryItem(index) {
    HistoryManager.deleteHistoryItem(index);
    const updated = HistoryManager.getAllHistory();
    setHistoryItems(updated);
  }





   return (
    
      <div className="calculatorContainer">
        <div className="mainView">
   
        <div className="textInputContainer">
    <textarea 
        className="textInput" 
        ref={textAreaRef}
        value={input}
        onChange={handleChange}
        onClick={(e) => setCursorPosition(e.target.selectionStart)}
    />
    <textarea 
        className="answerTextArea"
        value={answer}
        readOnly
    />
</div>



         
          <div className="modeContainer">
            <button className="modeBtn" onClick={types}>{text}</button>
            <button className="modeBtn">{modebtntext}</button>
            <button className="modeBtn3">{text_sa}</button>
            <button className="graphBtn" onClick={()=>setgraph(true)}>GRAPH</button>
          </div>

       
          <div className="upperGrid">
          
            <button className="shiftBtn" onClick={toggleShift} >Shift</button>
            <button className="alphaBtn" onClick={toggleAlpha}>Alpha</button>
            
            <button className="arrowBtn"><img src={leftarrow} alt="Left Arrow" className="icon" onClick={()=>cursor('left')} /></button>
            <button className="arrowBtn" ><img src={rightarrow} alt="Right Arrow" className="icon" onClick={()=>cursor('right') } /></button>
            <button className="modeBtn1"onClick={selectmode}>MODE</button>
           
      
 
            <button className="calcBtn">M+</button>

 
            <div>
              <p className="label">solve=</p>
              <button className="calcBtn">CALC</button>
            </div>
            <div>
              <p className="label">d/dx</p>
              <button className="calcBtn" onClick={()=>integration()}>∫<sup>x</sup><sub>y</sub></button>
            </div>
            <button className="arrowBtn1"><img src={up} alt="Up Arrow" className="icon" onClick={()=>cursor('up')} /></button>
            <button className="arrowBtn1"><img src={down} alt="Down Arrow" className="icon" onClick={()=>cursor('down')} /></button>
            <div>
              <p className="label">x!</p>
              <button className="calcBtn" onClick={()=>inverse()}>x⁻¹</button>
            </div>
            <div>
              <p className="label">∑</p>
              <button className="calcBtn">log₂y</button>
            </div>

            {/* Row 3 */}
            <div>
              <p className="label">x y/z </p>
              <button className="calcBtn" onClick={()=>fraction()}>x/y</button>
            </div>
            <div>
              <p className="label">x&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mod</p>
              <button className="calcBtn" onClick={()=>root()}>√x</button>
            </div>
            <div>
              <p className="label">x̅</p>
              <button className="calcBtn" onClick={()=>power()}>x²</button>
            </div>
            <div>
              <p className="label">ⁿ√y</p>
              <button className="calcBtn" onClick={()=>doublepower()}>xʸ</button>
            </div>
            <div>
              <p className="label">10ˣ</p>
              <button className="calcBtn" onClick={()=>log()}>Log</button>
            </div>
            <div>
              <p className="label">eˣ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t</p>
              <button className="calcBtn" onClick={()=>nln()}>Ln</button>
            </div>

            
            <div>
              <p className="label">∠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a</p>
              <button className="calcBtn">(-)</button>
            </div>
            <div>
              <p className="label3">FACT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b</p>
              <button className="calcBtn" onClick={()=>dms()}>° ' "</button>
            </div>
            <div>
              <p className="label">| x |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c</p>
              <button className="calcBtn" onClick={()=>setshowHypeMenu(true)}>hyp</button>
            </div>
            <div>
              <p className="label">sin⁻¹&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e</p>
              <button className="calcBtn" onClick={()=>sin()} >sin</button>
            </div>
            <div>
              <p className="label">cos⁻¹&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d</p>
              <button className="calcBtn"onClick={()=>cos()}>cos</button>
            </div>
            <div>
              <p className="label">tan⁻¹&nbsp;&nbsp;&nbsp;&nbsp;f</p>
              <button className="calcBtn" onClick={()=>tan()}>tan</button>
            </div>

          
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
              <button className="calcBtn"onClick={openbrack}>(</button>
            </div>
            <div>
              <p className="label">,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x</p>
              <button className="calcBtn"onClick={closebracl}>)</button>
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
         
       

         
          <div className="lowerGrid">
            
            <div>
              <p className="label1">CONST</p>
              <button className="numberBtn" onClick={seven}>7</button>
            </div>
            <div>
              <p className="label1">CONV SI</p>
              <button className="numberBtn" onClick={eight}>8</button>
            </div>
            <div>
              <p className="label1">Limit</p>
              <button className="numberBtn"onClick={nine}>9</button>
            </div>
            <div>
              <p className="label1">&nbsp;</p>
              <button className="deleteBtn" onClick={cut}>⌫</button>
            </div>
            
            <div>
              <p className="label1">CLR ALL</p>
              <button className="deleteBtn" onClick={clr}>AC</button>
            </div>

           
            <div>
              <p className="label1">MATRIX</p>
              <button className="numberBtn" onClick={four}>4</button>
            </div>
            <div>
              <p className="label1">VECTOR</p>
              <button className="numberBtn" onClick={five}>5</button>
            </div>
            <div>
              <p className="label1">FNC HELP</p>
              <button className="numberBtn"onClick={six}>6</button>
            </div>
            <div>
            <p className="label1">nCr&nbsp;&nbsp;&nbsp;GCD</p>

            <button className="operatorBtn"onClick={mul}>X</button>
            </div>
            
            <div>
            <p className="label1">nPr&nbsp;&nbsp;&nbsp;LCM</p>
            <button className="operatorBtn"onClick={div}>÷</button>
            </div>
          

          
            <div>
              <p className="label1">STAT</p>
              <button className="numberBtn" onClick={one}>1</button>
            </div>
            <div>
              <p className="label1">COMPLX</p>
              <button className="numberBtn" onClick={two}>2</button>
            </div>
            <div>
              <p className="label1">DISTR</p>
              <button className="numberBtn" onClick={three}>3</button>
            </div>
            <div>
              <p className="label1">Pol Cell</p>
              <button className="operatorBtn"onClick={plus}>+</button>
            </div>
            
            <div>
              <p className="label1">Rec Floor</p>
              <button className="operatorBtn"onClick={mins}>-</button>
            </div>

            
            <div>
              <p className="label1">copy paste </p>
              <button className="numberBtn"onClick={zero}>0</button>
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
            <button className="equalsBtn" onClick={()=>evaluate()}>=</button>
            </div>
          </div>
        </div>
        


    {
      showHistory&&(
          <HistoryList
          historyItems={historyItems}
          onDelete={handleDeleteHistoryItem}
          onBack={() => setShowHistory(false)}
        />
      )
    }

{/* {
        showHistory && (
        <div className="modeMenuContainer">
          <Historymenu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setSelectedMode={setSelectedMode} 
            shift={shift}
            reset={resetshift}
          />
        </div>
      )} */}





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
      setInput={setInput}  // ✅ pass input setter directly
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
         

      {convmenu && (
        <div className="modeMenuContainer">
          <ConvBtnMenu
            showConvMenu={convmenu}
            setShowConvMenu={setconvmenu}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift} 
          />
        </div>
      )}


  {matrix && (
        <div className="modeMenuContainer">
          <MatrixShift
            showMatrixMenu={matrix}
            setShowMatrixMenu={setmatrix}
            onDataSelect={MatrixDataSelect}
            shift={shift}
            resetshift={resetshift} 
          />
        </div>
      )}
     
     {vector && (
        <div className="modeMenuContainer">
          <VectorShift
            showVectorMenu={vector}
            setShowVectorMenu={setvctor}
            shift={shift}
            resetshift={resetshift} 
            onDataSelect={vectorDataSelect}
          />
        </div>
      )}

{base && (
        <div className="modeMenuContainer">
          <BaseShift
            showBaseMenu={base}
            setShowBaseMenu={setbase}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift} 
          />
        </div>
      )}

{cmplx && (
        <div className="modeMenuContainer">
          <CmplxShift
            showCmplxMenu={cmplx}
            setShowCmplxMenu={setcmplx}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift} 
          />
        </div>
      )}

{stat && (
        <div className="modeMenuContainer">
          <StatsShift
            showStatsMenu={stat}
            setShowStatsMenu={setstat}
            setSelectedMode={setSelectedMode}
            shift={shift}
            resetshift={resetshift} 
          />
        </div>
      )}


  {graph&& 
  (
  <Graph onClose={()=>setgraph(false)}/>)
    }


    


    
      </div>
    );
  }

  export default Calculator;