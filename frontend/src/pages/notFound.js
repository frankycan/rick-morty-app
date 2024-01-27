import { Link } from "react-router-dom"
import lost from '../assets/lost.gif'

function NotFound() {
    return (
        <div>
            <h1>Oops! You seem to be lost.</h1>
            <img src={lost} alt="loading..." />
        </div>
    )
}

export default  NotFound