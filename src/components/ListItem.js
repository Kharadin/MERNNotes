import React from 'react'
import { Link } from 'react-router-dom';


let getDate = (note)=> {
  return new Date(note.updated).toLocaleDateString()
}
let getTitle = (note) => {
      const title = note.body.split('\n')[0]
      
      if (title.lenghth > 45) {
        return title.slice(0,45)
      } 
      
      return title
}


let getContent = (note) => {
  const title = getTitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title, '')

  if (content.lenghth > 45) {
    return content.slice(0,45)
    
  }else {
    return content
  }
}


const ListItem = ({note}) => {
     // {note}instead of props, is desctructuring
     // it's direct utilisation of attribute assigned in JSX
     // console.log(note)
  return (
    <div>
      <Link to ={`/note/${note._id}`}>

        <div className='notes-list-item'>
           <h3>{getTitle(note)}</h3>
           <p><span>{getDate(note)}</span>{getContent(note)} </p>
        </div>
      </Link>
    </div>
  )
}

export default ListItem
