import {useHistory} from 'react-router'
import {useEffect} from 'react'
import { post } from '../../../routes/users'

export default function Register() {
    const history = useHistory()

    function handleRegister(e) {
        e.preventDefault()

        const form = e.target
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch('/register', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        
    }

    useEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/dashboard") : null)
    }, [])

    return (
        <form onSubmit={event => handleRegister(event)}>
            <input required type="email" />
            <input required type="password" />
            <input type="submit" value="submit" />
        </form>
    )
}

