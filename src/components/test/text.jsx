const { useEffect, useState } = require("react");

const [data, setData] = useState([]);
const [pedro, setPedro] = useState(false);

useEffect(()=>{
 fetch('https://jsonplaceholder.typicode.com/posts')
 .then((response) => response.json())
 .then((json) => setData(json ))
},[])



<ul>
  <button
  onClick={()=>setShowPedro((prev)=> !prev)}>

  </button>
  <ul>
    {data.map((item)=>(
      <li key={id}>
          {item.name}
      </li>
    ))}
  </ul>
</ul>

