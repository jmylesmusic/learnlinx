import "./HomeScreen.css";

export default function HomeScreen({ createCall, startHairCheck, courseId }) {
  const startDemo = () => {
    createCall(courseId).then((url) => {
      startHairCheck(url);
    });
  };

  return (
    <div className="home-screen">
      <h1>Video Class</h1>
      <p>Start a video class by clicking in the button below! </p>
      <button onClick={startDemo} type="button">
        Click to start a call
      </button>
      <p className="small">
        Select “Allow” to use your camera and mic for this call if prompted
      </p>
    </div>
  );
}
