import React from 'react';
import styles from './VioletButton.module.scss'

const VioletButton = ({buttonText, radius}) => {
    return (
        <div className={styles.buttonContainer} style={{borderRadius: radius}}>
            {buttonText}  
        </div>
    );
}

export default VioletButton;
