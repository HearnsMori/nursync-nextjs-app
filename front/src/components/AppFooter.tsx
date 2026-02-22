import "../app/globals.css";

export default function Footer({
  isLoggedIn,
}: { isLoggedIn: boolean }) {
  return (
    // Footer
    <footer
      className="flexC bggreen"
      style={{ position: 'absolute', zIndex: 999, bottom: 0, justifyContent: 'left', alignItems: 'left', width: '100vw', height: 'auto', padding: '1vw 0', margin: 0 }}
    >
      {/* Logo or Title */}
      <div
        className="flex"
        style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'left',
          paddingLeft: '6vw',
          fontSize: '2.6vw',
          fontWeight: 'bold',
          width: '100vw',
          height: '2.6vw',
        }}
      >
        NurSYNC
      </div>

      {/* Optional Links */}
      <div
        className="flexR"
        style={{ width: '100vw', fontSize: '1vw', justifyContent: 'left', alignItems: 'left', paddingLeft: '6vw', marginTop: '2vw' }}
      >
        {
          isLoggedIn ? (
            <>
              <a href="./signup" style={{ color: '#ffffff', textDecoration: 'underline', marginRight: '5vw' }}>
                
              </a>
            </>
          ) : (
            <>
              <a href="./" style={{ color: '#ffffff', textDecoration: 'underline', marginRight: '5vw' }}>
                Home
              </a>
              
              <a href="./signup" style={{ color: '#ffffff', textDecoration: 'underline', marginRight: '5vw' }}>
                Signup
              </a>

              <a href="./login" style={{ color: '#ffffff', textDecoration: 'underline', marginRight: '5vw' }}>
                Login
              </a>
            </>
          )
        }


        <a
          style={{ color: '#ffffff', textDecoration: 'underline' }}
          href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com&su=Subject%20Here&body=Message%20Body%20Here"
          target="_blank"
          rel="noopener noreferrer"
        >
          Send NurSYNC an email
        </a>
      </div>

      {/* Line */}
      <hr style={{ border: '0.2px solid #CCCCCC', width: '90%', marginTop: '3vw' }} />

      {/* Extra Info: Company Address or Slogan */}
      <div
        className="flex"
        style={{
          color: '#dddddd',
          justifyContent: 'left',
          paddingLeft: '6vw',
          fontSize: '1.5vw',
          marginTop: '1vw',
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
          fontSize: '1.5vw',
          marginTop: '1vw',
        }}
      >
        &copy; 2025 NurSYNC
      </div>
    </footer>
  );
}