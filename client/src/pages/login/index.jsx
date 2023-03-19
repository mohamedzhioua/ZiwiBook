import { useState } from "react";
import { LoginForm, RegisterForm } from "../../components";

function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <LoginForm setShowRegister={setShowRegister} />
      {showRegister && (
        <RegisterForm
          showRegister={showRegister}
          setShowRegister={setShowRegister}
        />
      )}
    </div>
  );
}

export default Login;
