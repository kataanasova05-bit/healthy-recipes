import { useState } from "react";
import {useNavigate} from "react-router-dom";

function AddRecipe(){
  const [title,setTitle]=useState("");
  const [calories,setCalories]=useState("");
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();

    const newRecipe={
      title,
      calories:Number(calories)
    };

    fetch("http://localhost:3001/recipes",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newRecipe)
    }).then(()=>{
      navigate("/");
    });
  };

  return(
    <div>
      <h1>Add Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe name"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
          <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e)=>setCalories(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
  }

  export default AddRecipe;