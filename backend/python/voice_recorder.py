import sounddevice as sd
import numpy as np
import scipy.io.wavfile as wav

def record_voice(filename, duration=5, fs=16000):
    print("Recording started...")
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1)
    sd.wait()  # Wait until recording is finished
    print("Recording complete!")

    # Save recording to file
    wav.write(filename, fs, recording)
    print(f"Recording saved to {filename}")
