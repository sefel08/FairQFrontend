import React, { useState } from 'react';
import styles from './SearchBox.module.css';

const SearchBox = ({ onSearch }) => {
    const [inputText, setInputText] = useState('');
    
    return (
        <div className={styles.searchBox}>
            <input
                className={styles.input} 
                placeholder="Co chcesz usłyszeć?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(inputText)}
            />
            <button className={styles.button} onClick={() => onSearch(inputText)}>
                Szukaj
            </button>
        </div>
    );
}

export default SearchBox;