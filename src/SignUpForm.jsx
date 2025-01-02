import React from 'react';
import { useForm } from 'react-hook-form';

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
        console.log(data)
      // Send a POST request to the API endpoint with form data
      const response = await fetch('http://localhost:3000/user/signup', {
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

      // Handle successful sign-up response
      const responseData = await response.json();
      alert('Sign-up successful: ' + responseData.message); // Show success message

      // Optionally, reset the form after success
      // reset(); // Uncomment this line if you'd like to reset the form fields

    } catch (error) {
      console.error('Error during sign-up request:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Name</label>
            <input
              id="name"
              name="name"
              placeholder="Enter your name"
              style={styles.input}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p style={styles.error}>{errors.name.message}</p>}
          </div>

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
            <button type="submit" style={styles.button}>Sign Up</button>
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
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
    fontWeight: '500',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s',
  },
};

export default SignUpForm;

