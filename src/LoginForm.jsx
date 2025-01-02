import React from 'react';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();  // Hook to navigate programmatically

  const onSubmit = async (data) => {
    try {
      // Send a POST request to the API endpoint with form data
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Sending the form data as JSON
      });

      // Check if the response is successful
      if (!response.ok) {
        // If not successful, throw an error (you can handle it here based on the response)
        const errorData = await response.json();
        alert(errorData.message || 'An error occurred');
        return;
      }

      // Handle successful login response
      const responseData = await response.json();
      
      // Assuming the backend sends the authToken in the response
      const authToken = responseData.authToken;
      console.log(`token ${authToken}`);

      // Store the authToken (You can store it in localStorage or state depending on your needs)
      localStorage.setItem('authToken', authToken);  // Store in localStorage

      // Show a success message
      alert('Login successful');

      // Navigate to the home/dashboard page
    //   navigate('/dashboard');  // Assuming you have a dashboard route

    } catch (error) {
      console.error('Error during login request:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              style={styles.input}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p style={styles.error}>{errors.email.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              style={styles.input}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p style={styles.error}>{errors.password.message}</p>}
          </div>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f7fc',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#555',
    fontWeight: '500',
  },
  input: {
    padding: '14px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#4CAF50',
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginTop: '5px',
  },
  buttonContainer: {
    marginTop: '30px',
  },
  button: {
    padding: '14px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  },
};

export default LoginForm;

