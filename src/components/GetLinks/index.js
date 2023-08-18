import axios from "axios";
import { useState } from "react";

const GetLinks =() =>{
  const [data, setdata] = useState(null)
  const [error, setError] = useState("")

  const getLinksData= () =>{
    axios.get("http://localhost:3002/farmart/allLinks").then(response => {
      console.log("response",response)
      if(response?.data){
        setError("")
        setdata([...response.data])
      }
    }
    ).catch(error => {
        setdata(null)
        setError(error)
    })

  }
  return  (
    <div className= "flex gap-3 flex-col">
<button onClick={getLinksData} className="border border-gray-500 bg-gray-100 px-1 py-1 rounded-sm">Get all Links</button>
      <div className= "flex gap-3 flex-col">
        {data?.map((link, index) => <a className="hover:underline" href={link.shortUrl} key={index}>{link.shortUrl}</a>)}
      </div>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  )
}

export default GetLinks;