// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function VerifyEmailPage() {
//   const { token } = useParams();
//   const [message, setMessage] = useState("Verifying your email...");

//   useEffect(() => {
//     fetch(`http://192.168.0.247:3000/api/auth/verify/${token}`)
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message))
//       .catch(() => setMessage("Verification failed."));
//   }, [token]);

//   return <h2>{message}</h2>;
// }

// export default VerifyEmailPage;