import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import herologo from "../images/heropage-image.webp";
export function Home() {
  return (
    <div>
      <img src={herologo} alt="Hero Logo" className="hero-image" />
    </div>
  );
}

export default Home;
