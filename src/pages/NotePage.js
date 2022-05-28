import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
// import notes from '../assets/data';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useNavigate} from "react-router-dom"
import Axios from "axios"
//import { response } from 'express';

const NotePage = ({history}) => {
  // let {id} = useParams();
 

  let noteId= useParams().id;
  // useParams() Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
  // id is for number that takes it's place., comes  from ListItem.
  
  const navigate = useNavigate()

  //console.log(props);
  //console.log(useParams);
   console.log('NoteId: ', noteId);

  
  // let note = notes.find(note => note.id === Number(noteId));
  
  let [note, setNote] = useState (null)
  // useState should be set at the top level of the component and never inside the useEffect

   useEffect(() => {
    getNote()
     }, [])
     // was [noteId]

        

     let getNote = async () => {
      if (noteId === 'new') return
      let response = await Axios.get('http://localhost:3001/getNote', 
      { params: {
         _id:noteId,
           } 
      })
      let data = await response.data
      setNote(data);
      console.log(' Get data:', data)
  }

    // let getNote = async () => {
    //   if (noteId === 'new') return
    //   let response = await fetch (`http://localhost:8000/notes/${noteId}`)
    //   console.log(response)
    //   let data =  await response.json()
    //   console.log('data from response: ', data)
    //    setNote(data)
      
    // }
    
 // console.log(note)


 const createNote = () => {Axios.post('http://localhost:3001/createNote', 
          {
            body: note.body,
            //updated: new Date()
              } 
        ).then(
           response => {
             console.log(response);
             // can be passage to notes to make quicker data update on the list page..... 
            }, 
            error => {
              alert(error);
            } );
  };




//   let createNote = async () => {
//     await fetch(`http://localhost:8000/notes/`, {
//       method: 'POST',
//       headers: {
//            'Content-type': 'application/json'
//       },
//       body: JSON.stringify({...note, 'updated': new Date()})

//     })
// }



let updateNote = async () => {
  
  //let response = 
  await Axios.put('http://localhost:3001/updateNote', 
  { 
     _id: noteId,
     body: note.body,
  })
  console.log('update request sent')
 // let data = await response.data
  // maybe the above makes it slower? but if not, will the list be updated in time ?
 // console.log('update response data:', data)
}


  //  async function updateNote() {
  //   await fetch(`http://localhost:8000/notes/${noteId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({ ...note, 'updated': new Date() })
  //   });
  // }

  // { params: {
  //   _id:noteId,
  //     } 

let deleteNote = async ()=> {
  let response = await Axios.delete('http://localhost:3001/deleteNote', 
  // with await,  was added here, the console log received the proper responce
  { data: {
    // another option was params: and req.query._id on the express side.
    _id:noteId,
      } 
 })
 //  .then ((response) => {
   //    // this handling still doesn't work... 
   //       console.log('response from delete req: ', response.data)
   //         },
   //           error => {
     //             console.log(error)
     //           }  
     //           )
     console.log('delete request sent')
     console.log('response from delete req: ', response.data)
  navigate('/')
}


  //  let deleteNote = async (e) => {
  //       await fetch(`http://localhost:8000/notes/${noteId}`, {
  //         method: 'DELETE',
  //         headers: {
  //             'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify(note)

  //       })
  //       // e.preventDefault()
  //       navigate('/')
  //  }

   async function handleSubmit(e) {
    e.preventDefault();
    console.log("handlesubmit fired");
    //console.log ('id and body:', noteId, note.body)
    if (noteId === 'new' && note == null) {
      navigate('/');
      return;
    } else if (noteId === 'new' && note.body !== null) {
      createNote();
      console.log('create');

    } else if (noteId !== 'new' && note.body === '') {
      deleteNote();
      console.log('delete');
    }
    else if (noteId !== 'new' && note.body !== null) {
      updateNote();
      console.log('update');

    }

    console.log('out of ifs');
    navigate("/");
  }

  return (
    <div className='note'>

      <div className='note-header'>
         <h3>
            <Link to="">
              <ArrowLeft onClick={handleSubmit}/>
            </Link>

         </h3>
          {noteId !=='new' ? (
                <button onClick= {deleteNote}>Delete</button>
          ): ( 
                <button onClick ={handleSubmit}>Done</button>
          )}

      </div>
      <textarea value= {note?.body} onChange ={(e) => setNote({...note, 'body':e.target.value})}   >
      {/* // if there is... */}
        </textarea>
    </div>
  )
}

export default NotePage
