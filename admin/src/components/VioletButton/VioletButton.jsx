import React from 'react';
import styles from './VioletButton.module.scss'

const VioletButton = ({buttonText, radius, onClickFunction}) => {
    return (
        <div className={styles.buttonContainer} style={{borderRadius: radius}} onClick={onClickFunction}>
            {buttonText}  
        </div>
    );
}

export default VioletButton;
