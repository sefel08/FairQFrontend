import React, { useState } from 'react';
import styles from './Navbar.module.css';

/**
 * Simple navbar component.
 * @param {Object} props - Właściwości komponentu.
 * @param {Array<Object>} props.tabs - Tablica obiektów definiujących zakładki.
 * @param {string} props.tabs[].name - Nazwa wyświetlana na przycisku (np. 'Ustawienia').
 * @param {string} props.tabs[].value - Wartość identyfikująca widok (np. 'settings').
 * @param {function} props.changeView - Funkcja zmieniająca aktualny widok, przyjmuje `tab.value` jako argument.
 */
const Navbar = ({ tabs, changeView }) => {
    
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                {tabs.map((tab, index) => (
                    <li key={index} className={styles.navItem}>
                        <button className={styles.navButton} onClick={() => changeView(tab.value)}>
                            {tab.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;