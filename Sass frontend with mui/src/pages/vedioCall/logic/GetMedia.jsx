export const GetMedia = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true, // Request video track
      audio: true, // Request audio track
    });
    const videoTrack = stream.getVideoTracks()[0];
    const audioTrack = stream.getAudioTracks()[0];
    return { videoTrack, audioTrack };
  } catch (error) {
    console.error("Error accessing camera and microphone:", error);
  }
};
