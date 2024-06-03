import React from 'react'
import css from './header.module.css'

const Header = ({ onImageUpload }) => {

  const uploadImage = (e) => {
    const file = e.target.files[0]
    onImageUpload(file)
  }

  return (
    <header className={css.header}>
      <h1>Colors</h1>
      <div className={css.input}>
        <label htmlFor="file">Upload Image<i className="fa-solid fa-images"></i></label>
        <input type="file" id="file" onChange={uploadImage}/>
      </div>
    </header>
  )
}

export default Header