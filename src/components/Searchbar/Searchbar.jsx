import style from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
import React, { useState } from 'react';
import Notiflix from 'notiflix';

const Searchbar = ({ onSubmitHandler }) => {
  const [name, setName] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name.trim() === '') {
      Notiflix.Notify.failure('search string is empty!');
      return;
    }

    onSubmitHandler({ name });

    reset();
  };

  const reset = () => {
    setName('');
  };

  return (
    <header className={style.searchbar}>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={name}
        />
        <button type="submit" className={style.searchFormButton}>
          <span className={style.buttonLabel}>Search</span>
          <FcSearch className={style.fc} />
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
