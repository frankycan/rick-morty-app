import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <ul>
                <li><Link to='/login'>Log in</Link></li>
                <li><Link to='/register'>Create account</Link></li>
            </ul>
        </div>
    )
}

export default  NotFound