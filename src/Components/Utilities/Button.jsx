

const Button = ({
    children,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    style = {},
    ...rest
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rm-btn ${className}`}
        style={style}
        {...rest}
    >
        {children}
    </button>
);


export default Button;