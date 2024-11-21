

# To Download Torch on my system : pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# _____Coqui-ai-TTS____
# Article : https://stackoverflow.com/questions/66726331/how-can-i-run-mozilla-tts-coqui-tts-training-with-cuda-on-a-windows-system

# On Windows:
# Install Python 3.8
# Use FFMPEG to convert audio files to .mp3
# cd python
# git clone https://github.com/coqui-ai/TTS.git
# pip install -e .[all,dev,notebooks]


# _____Tacotron2____

# Install Python 3.7.9
# Use FFMPEG to convert audio files to .mp3
# cd python
# -git clone https://github.com/NVIDIA/tacotron2.git
# -pip install tensorflow==1.15
# -pip install unidecode tensorboardX tqdm
# -python3 -m pip install --upgrade pip setuptools wheel
# -cd tacotron2 > pip install -r requirements.txt
# -pip install torch torchvision torchaudio
# -git clone https://github.com/NVIDIA/apex
# -cd apex
# -pip install -v --disable-pip-version-check --no-cache-dir ./
# -pip install protobuf==3.20.3
# -python train.py --output_directory=outdir --log_directory=logdir -c tacotron2_statedict.pt --warm_start
# -python train.py --output_directory="C:\\Users\\Eshan Sud\\Desktop\\Speech Synthesis\\audio\\output" --log_directory="C:\\Users\\Eshan Sud\\Desktop\\Speech Synthesis\\audio\\logs" -c tacotron2_statedict.pt --warm_start
# -python train.py --output_directory=./output --log_directory=./logs --hparams="batch_size=32,learning_rate=0.001,epochs=1000"



data_path = 'wavs'
