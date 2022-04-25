// import React, { useEffect, useState } from 'react';
import style from './ThemeCard.module.css';

function ThemeCard({ theme }) {

  return (
    <div className="card11">
      <div className={style.themeCard}>
        <div className="card-body">
          <div >
            <h1 className="cardTitle">{theme.theme_title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeCard;
