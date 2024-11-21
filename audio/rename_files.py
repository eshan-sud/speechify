
# Renames all files of a particular user

import os
from pydub import AudioSegment

def convert_and_rename_files(folder_path):
    files = os.listdir(folder_path)
    m4a_files = [f for f in files if f.lower().endswith('.m4a')]

    print(f"Folder Path : {folder_path}")
    print(f"All files in the folder : {files}")
    print(f"m4a files found : {len(m4a_files)}")

    # Create a subfolder for converted files
    wav_folder = os.path.join(folder_path, "wavs")
    os.makedirs(wav_folder, exist_ok=True)

    for index, m4a_file in enumerate(m4a_files, start=1):
        old_path = os.path.join(folder_path, m4a_file)
        new_path = os.path.join(wav_folder, f"{index}.wav")

        # Convert m4a to wav
        try:
            audio = AudioSegment.from_file(old_path, format="m4a")
            audio.export(new_path, format="wav")
            print(f"Converted and renamed: {m4a_file} -> {index}.wav")
        except Exception as e:
            print(f"Failed to convert {m4a_file}: {e}")

if __name__ == "__main__":
    folder_path = "../audio"
    convert_and_rename_files(folder_path)
    print("m4a files converted to wav and renamed successfully!")
