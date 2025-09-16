function handleFullScreen() {
  try {
    const box = document.getElementById("make-fullscreen");

    if (!document.fullscreenElement) {
      box
        .requestFullscreen()
        .then(() => {})
        .catch((err) => {});
    } else {
      document.exitFullscreen().then(() => {});
    }
  } catch (error) {}
}

export default handleFullScreen;
