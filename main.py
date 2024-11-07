import PySimpleGUI as sg
from voice_recorder import record_voice
from model_trainer import train_voice_model
from voice_generator import generate_voice

# UI layout
layout = [
    [sg.Text("Custom Voice Assistant Trainer")],
    [sg.Button("Record Voice"), sg.Button("Train Model"), sg.Button("Generate Voice")],
    [sg.InputText(default_text="Enter text to generate voice", key="input_text")],
    [sg.Text("", key="status", size=(40, 1))]
]

# Create the window
window = sg.Window("Custom Voice Assistant", layout)

while True:
    event, values = window.read()
    
    if event == sg.WIN_CLOSED:
        break
    
    # Record Voice
    if event == "Record Voice":
        filename = "recordings/my_voice.wav"
        record_voice(filename, duration=5)
        window["status"].update("Voice recorded!")
    
    # Train Model
    if event == "Train Model":
        train_voice_model("recordings/")
        window["status"].update("Model trained!")
    
    # Generate Voice
    if event == "Generate Voice":
        text = values["input_text"]
        generate_voice(text, "output_voice.wav")
        window["status"].update("Voice generated and saved as 'output_voice.wav'!")

window.close()
