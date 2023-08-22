import React from 'react';

function Button({variant, onClick, children, onKeyUp, disabled}) {
    return (
        <>
            <button disabled={disabled} className={variant} onKeyUp={onKeyUp}
                    onClick={onClick}>{children}</button>
        </>
    );
}

export default Button;
