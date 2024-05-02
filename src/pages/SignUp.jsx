import axios from "axios";
import { TextInput, PasswordInput, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handlePhone = (e) => setPhoneNumber(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    };
    console.log("Request body:", requestBody);
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div>
      <Text size="lg" fw={500}>
        Create your Account!
      </Text>

      <form onSubmit={handleSignupSubmit}>
        <Stack>
          <TextInput
            label="First Name"
            placeholder="Your first name"
            value={firstName}
            onChange={handleFirstName}
            radius="md"
          />

          <TextInput
            label="Last Name"
            placeholder="Your last name"
            value={lastName}
            onChange={handleLastName}
            radius="md"
          />
          <TextInput
            required
            label="Phone"
            placeholder="07039434"
            value={phoneNumber}
            onChange={handlePhone}
            radius="md"
          />

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={email}
            onChange={handleEmail}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={handlePassword}
            radius="md"
          />
          {errorMessage && (
            <Text color="red" size="sm">
              {errorMessage}
            </Text>
          )}
          <Button type="submit">Create Account</Button>
        </Stack>
      </form>
    </div>
  );
};

export default SignUp;
