import { useEffect, useRef, useState } from "react";
import {faker} from "@faker-js/faker"

function App() {
  const [ind,setInd]=useState(0);
  const [words,setWords]=useState(faker.lorem.words(4))
  const [arr,setArr]=useState([...words.trim().split("")])
  const [input,setInput]=useState([])
  const [chkStart,setStart]=useState(null)
  const [prevTimer,setTimer]=useState(300)
  const [prevErr,setErrors]=useState(0)
  const [prevCnt,setCnt]=useState(0)
  const [times,setTimes]=useState(0)
  const [res,setRes]=useState({
   wpm:0,
   acc:0,
   chk:0, 
  })

const intr=useRef(null)
const textRef=useRef(null)
const calError=(arr,str)=>{
  
  let len=arr.length
  let ans=0;
  for(let i=0;i<len;i++){
    ans+=(arr[i]!==str[i])
  }
  return ans;

}

  useEffect(() => {
    setArr([...words.trim().split("")])
  }, [words])
  
  useEffect(
    () => {
     if(prevTimer===0) 
      {
      
      clearInterval(intr.current)
      setErrors(prevErr=>prevErr+calError(arr,input));
      setCnt(prevCnt=>prevCnt+input.length);
      setTimes(prev=>prev+input.join("").split(" ").length);
      setInd(0)
      setStart(false)
      setTimer(300)
      setRes({
        wpm:parseInt(times/5),
        acc:parseInt(((prevCnt-prevErr)/prevCnt)*100),
        chk:1 
      })
      textRef.current.value=""
      alert("Times Up")  
      setTimes(0)
      setErrors(0)
      setCnt(0)
    }
    },
    [prevTimer,prevCnt,prevErr,times,arr,input],
  )
  
  
  
  const handleChange=(e)=>{ 
   if(!chkStart){
    setStart(true)
    intr.current=setInterval(()=>{
      setTimer(prevTimer=>prevTimer-1) 
    },1000)
   }
     setInd(e.target.value.length)
     setInput(e.target.value.split(""))
     if(ind+1===words.length)
     {
      setWords(faker.lorem.words(4));
      setErrors(prevErr=>prevErr+calError(arr,input));
      setCnt(prevCnt=>prevCnt+arr.length);
      setTimes(prev=>prev+4);
      setInd(0)
      e.target.value=""
     }
  }
  return (
    <div className="grid place-content-center w-full min-h-screen bg-gradient-to-r from-orange-100 to-blue-200 ">
      <div className="p-4">
      <h3 className="text-7xl font-bold text-center mb-10">Learn Touch Typing</h3>
      </div>
      <div className="text-center text-2xl text-pink-600 font-bold">Time Left : <span className="text-teal-700">{prevTimer} s</span></div>
      <div className="text-center text-2xl font-bold p-5">
        {
          arr.map((itm,i)=>{
            if(i===ind){
              return <span key={i} className="text-blue-500 text-5xl border-b-2 border-black">{itm}</span>
            }
            else if(i>ind){
              return itm
            }
            else{
              if(arr[i]!==input[i])
                 {
                  if(arr[i]===" "){
                    return <span key={i} className="bg-red-500/40">{itm}</span>
                  }
                  return <span key={i} className="text-red-500">{itm}</span> 
                }
              else return <span key={i} className="text-green-500">{itm}</span>   

            }
          })
        }
      </div>
      <div className=" text-center ">
        <textarea ref={textRef} onChange={(e)=>handleChange(e)} className="p-4 text-2xl border-2 border-black rounded-xl w-full"  rows={4}  />
      </div>
      {(res.chk===1)?<div className="flex flex-col p-5 justify-center text-2xl items-center gap-2 font-medium"><span className="text-blue-700" >WPA : {res.wpm}</span><span className="text-green-700 ">Accuracy : {res.acc}%</span></div>:<span className="mt-4 text-center text-red-700 text-xl font-semibold">Perfomance evaluated in a session of at least 5 mins</span>}
    </div>
  );
}

export default App;
