interface Props {
    className?: string;
}
const Loader = ({className = ''}: Props) => {
    return (
        <div>
            <div className={`dot-spinner ${className}`}>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
            </div>
        </div>
    )

}

export default Loader