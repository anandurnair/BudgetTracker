import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {

  const [income,setIncome] = useState();
  const [category,setCategory] = useState('');
  const [expense,setExpense] = useState();
  const [allExpense,setAllExpense] = useState([])
  const [totalExpense,setTotalExpense] = useState(0)
  const AddButton =()=>{
    const singleExpense={}
    singleExpense['category'] = category;
    singleExpense['expense'] =expense
    setTotalExpense(prev=>prev+parseFloat(expense))
    setAllExpense([...allExpense,singleExpense])
    setCategory('');
    setExpense('');
  }

  
  

  const handleSubmit=async()=>{
      console.log(allExpense)
      
    try {
      const res = await axios.post('http://localhost:3000/expense',{income,allExpense,totalExpense})
      if(res.status === 200){
        alert(res.data.message)
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <>
      <div className="flex h-auto flex-col gap-y-6 w-full">
        <h2 className="text-3xl text-center">Budget Tracker</h2>
        <div className="flex flex-col gap-y-2 ">
          <input
          value={income}
            type="number"
            placeholder="Enter your income"
            className="border-2 border-black p-2"
            onChange={(e)=>setIncome(e.target.value)}
          />
          Enter your expenses
          {allExpense.map((e,index)=>(
             <div key={index} className="flex gap-x-2">
             <input
             value={e.category}
               type="text"
               placeholder="enter category"
               className="border-2 border-black p-1"
               disabled
             />
             <input
             value={e.expense}
               type="number"
               placeholder="enter expense"
               className="border-2 border-black p-1"
               disabled
             />
           </div>
          ))}
          <h2>Current Expense : {totalExpense}</h2>
         
          <div className="flex gap-x-2">
            <input
            value={category}
              type="text"
              placeholder="enter category"
              className="border-2 border-black p-1"
              onChange={(e)=>setCategory(e.target.value)}
            />
            <input
            value={expense}
              type="number"
              placeholder="enter expense"
              className="border-2 border-black p-1"
              onChange={(e)=>setExpense(e.target.value)}
            />
          </div>
          <button className="border-2 border-black p-2" onClick={AddButton}>Add expense</button>
          <button className="border-2 border-black p-2" onClick={handleSubmit}>Submit</button>
        </div>

        <div className="">
          <h2>All Lists</h2>
          <div className="flex h-96 flex-col gap-y-4" >
            <div className="w-50 h-50 border-2 p-4">
              <h2> Entry one</h2>
               <p>Income</p>
               <p>Categories</p>
               
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
