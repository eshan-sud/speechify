
# Preprocesses the uploaded audio files before passing to model for training

import os
import librosa
import soundfile as sf

input_path = "../audio/wavs"
output_path = "../audio/output"

if not os.path.exists(output_path):
    os.makedirs(output_path)

for filename in os.listdir(input_path):
    if filename.endswith(".wav"):
        # Load the .wav file
        filepath = os.path.join(input_path, filename)
        y, sr = librosa.load(filepath, sr=22050)

        trimmed_audio, _ = librosa.effects.trim(y, top_db=20) # Trim silence
        normalized_audio = librosa.util.normalize(trimmed_audio) # Normalize audio

        # Save processed .wav file to the output folder
        output_filepath = os.path.join(output_path, filename)
        sf.write(output_filepath, normalized_audio, sr, subtype='PCM_16')

print("All .wav files have been preprocessed and saved to the output folder")