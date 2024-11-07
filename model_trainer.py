# Using pretrained Tacotron 2

import librosa
import tensorflow_tts

def preprocess_audio(audio_path):
    y, sr = librosa.load(audio_path, sr=16000)
    normalized_audio = librosa.util.normalize(y)
    return normalized_audio, sr

def train_voice_model(dataset_path):
    # This assumes you have a dataset with recorded audio and corresponding text
    # Load pre-trained Tacotron2 model
    from tensorflow_tts.models import TFAutoModel
    tacotron2 = TFAutoModel.from_pretrained("tacotron2")
    
    # Fine-tune the model on your dataset (need a large amount of data)
    # Example placeholder for training code:
    print(f"Training on dataset at {dataset_path}...")
    
    # Save model after training
    tacotron2.save_pretrained("models/custom_tacotron2")
    print("Model trained and saved to 'models/custom_tacotron2'")
