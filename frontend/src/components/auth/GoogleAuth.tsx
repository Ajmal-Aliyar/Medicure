import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { api } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

interface DecodedUser {
  name: string;
  email: string;
  picture: string;
}

const GoogleAuth: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (response: CredentialResponse) => {
    const decodedUser: DecodedUser | undefined = response && response.credential && jwtDecode<DecodedUser>(response.credential) || undefined

    if (decodedUser) {
      api.post("/api/auth/google-auth", {
        fullName: decodedUser.name,
        email: decodedUser.email,
        profileImage: decodedUser.picture,
      })
        .then(() => navigate("/"))
        .catch((error) => console.error("Google Auth API Error:", error));
    }

  };

  return (
    <GoogleLogin
      onSuccess={(response) => handleSubmit(response)}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleAuth;
