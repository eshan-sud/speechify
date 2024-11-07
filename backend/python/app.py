from flask import Flask, request, jsonify
import whisper
import tts_model

app = Flask(__name__)

@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    audio_file = request.files['file']
    text = whisper_model.transcribe(audio_file)
    return jsonify({"transcribed_text": text})

@app.route('/generate_tts', methods=['POST'])
def generate_tts():
    text = request.json.get("text")
    generated_audio = tts_model.synthesize(text)
    return jsonify({"audio_url": save_and_get_url(generated_audio)})

if __name__ == '__main__':
    app.run(debug=True)
