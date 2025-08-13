import React from 'react'

const UserRegister = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [cardId, setCardId] = React.useState('')
    const [birthDate, setBirthDate] = React.useState('')
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const handleRegister = async (e) => {
        e.preventDefault() // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, firstName, lastName, cardId, birthDate })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Registration failed')
            }

            const data = await response.json()
            setSuccess(true)
            console.log('Registration successful:', data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <>
      <h2>User Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Card ID"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registration successful!</p>}
    </>
  )
}

export default UserRegister