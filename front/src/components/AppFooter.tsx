import "../app/globals.css";

export default function Footer() {
  return (
    // Footer
    <footer
      className="flexC green"
      style={{ width: '100vw', height: 'auto', padding: '5vw 0', margin: 0, background: '#008040' }}
    >
      {/* Logo or Title */}
      <div
        className="flex"
        style={{
          color: 'white',
          justifyContent: 'left',
          paddingLeft: '6vw',
          fontSize: '4.5vw',
          fontWeight: 'bold',
        }}
      >
        NurSYNC
      </div>

      {/* Optional Links */}
      <div
        className="flex"
        style={{ justifyContent: 'left', paddingLeft: '6vw', marginTop: '3vw' }}
      >
        <a href="./signup" style={{ color: '#ffffff', textDecoration: 'underline', marginRight: '5vw' }}>
          Signup
        </a>
        <a href="./login" style={{ color: '#ffffff', textDecoration: 'underline', marginRight: '5vw' }}>
          Login
        </a>

        <a
          style={{ color: '#ffffff', textDecoration: 'underline' }}
          href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com&su=Subject%20Here&body=Message%20Body%20Here"
          target="_blank"
          rel="noopener noreferrer"
        >
          Send me a message
        </a>
      </div>

      {/* Line */}
      <hr style={{ border: '0.2px solid #CCCCCC', width: '90%', marginTop: '5vw' }} />

      {/* Extra Info: Company Address or Slogan */}
      <div
        className="flex"
        style={{
          color: '#dddddd',
          justifyContent: 'left',
          paddingLeft: '6vw',
          fontSize: '2.6vw',
          marginTop: '2vw',
        }}
      >
        Philippines
      </div>

      {/* Copyright */}
      <div
        className="flex"
        style={{
          color: '#dddddd',
          justifyContent: 'left',
          paddingLeft: '6vw',
          fontSize: '2.6vw',
          marginTop: '2vw',
        }}
      >
        &copy; 2025 NurSYNC
      </div>
    </footer>
  );
}