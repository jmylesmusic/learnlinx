import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import herologo from "../images/heropage-image.webp";
export function Home() {
  return (
    <div>
      <img src={herologo} alt="Hero Logo" className="hero-image" />
      <h1>Here's some text that will be displayed</h1>
    </div>
  );
}

export default Home;
