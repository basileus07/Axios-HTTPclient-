//****************************** Axios HTTP client libraries **************************/

import './App.css';
import axios, { Axios } from 'axios';
import React from 'react';


// Create an Axios Instance 
const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts"
});



function App() {

 const [post, setPost] = React.useState(null);
 const [error, setError] = React.useState(null);

// Without useing Axios Instance 
//  React.useEffect(()=>{
//    axios
//    .get(`${baseURL}/3`)
//    .then((response)=>{
//       setPost(response.data);
//    }).catch(error=>{       //invalid url will trigger an 404 error
//      setError(error);
//    });
//  },[]);
 
//Without  using async-await syntax with Axios 
// React.useEffect(()=>{
//   client.get("/1")
//         .then((response)=>{
//           setPost(response.data);
//         });
// }, []);

//With async-await syntax
React.useEffect(()=>{
  async function getPost(){
    const response = await client.get("/1");
    setPost(response.data);
  }
  getPost();
}, []);


 if(error)
    return `Error: ${error.message}`;
 
 function createPost(){
   client
   .post("/", {
     title: "hello World!",
     body: "This is a new post."
    })
    .then((response)=>{
      setPost(response.data);
    });
  }

 function updatePost(){
   axios
   .put("/1",{
     title: "Hello world!",
     body: "This is post is update."
   })
   .then((response)=>{
      setPost(response.data);
   });
 }
 
//  function deletePost(){
//    client
//    .delete("/1")
//    .then(()=>{
//      alert("Post Deleted!");
//      setPost(null)
//    });
//  }

// deletePost wiht async 
async function deletePost(){
  await client.delete("/1");
  alert("Post deleted!");
  setPost(null);
}

  if(!post)
     return "No Post!";

  return (
    <div className="App">
       <h1>{post.title}</h1>
       <p>{post.body}</p>
       {/* <button onClick={createPost}>Create Post</button> */}
       {/* <button onClick={updatePost}>Update Post</button> */}
       <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;




// // Created own Custom useAxios Hook
// import { useAxios } from "use-axios-client";

// export default function App() {
//   const { data, error, loading } = useAxios({
//     url: "https://jsonplaceholder.typicode.com/posts/1"
//   });

//   if (loading || !data) return "Loading...";
//   if (error) return "Error!";

//   return (
//     <div>
//       <h1>{data.title}</h1>
//       <p>{data.body}</p>
//     </div>
//   ) 
// }

