import React, {useEffect, useState} from 'react'
// import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton  from '../components/AddButton'
import Axios from "axios"



 var checkNLPTimes = 0

const NotesListPage = () => {
  
   checkNLPTimes++

  console.log('checkNLPTimes:',  checkNLPTimes )


  let [notes, setNotes] = useState ([])
  //console.log(notes)
 
  useEffect (()=> {
    console.log('i fire once1')
    getNotes()
    setTimeout (() => {
      getNotes()
    }, 500
    )
    
    console.log('i fire once2')
  }, [])

let getNotes = async () => {
    let response = await Axios.get('https://notesmern220527.herokuapp.com/getNotes')
    let data = await response.data
    setNotes(data);
    console.log('data:', data)
}
  //old stuff with local fetch.
  // let getNotes = async () => {
  //   let response = await fetch('http://localhost:8000/notes')
  //   let data = await response.json()
  //   setNotes(data);
  //   console.log('data:', data)
  // }
  // console.log('check after getnotes')


  return (
    <div className='notes'>

          <div className='notes-header'>
            <h2 className="notes-title">&#9782; Notes</h2>
            <p className='notes-counter'>{notes.length}</p>
          </div>

          <div className="notes-list" >
                  {notes.map((note, index) => (
                        
                      <ListItem key={index} note={note} />
                  ))}
          </div>
          <AddButton />
    </div>
  )
}

export default NotesListPage
