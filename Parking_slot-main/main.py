from flask import Flask, render_template, Response, jsonify
import cv2
import pickle
import numpy as np
from keras.models import load_model
from threading import Thread

app = Flask(__name__)

model = load_model('model_final.h5')
class_dictionary = {0: 'no_car', 1: 'car'}
cap = cv2.VideoCapture('car_test_2.mp4')

with open('carposition.pkl', 'rb') as f:
    posList = pickle.load(f)

outp = []
width, height = 100, 45

free_spaces = 0
occupied_spaces = 0
frame = None

def checkParkingSpace(img):

    global free_spaces, occupied_spaces
    spaceCounter = 0
    imgCrops = []


    for pos in posList:
        x, y = pos
        imgCrop = img[y:y + height, x:x + width]
        imgResize = cv2.resize(imgCrop, (48, 48))
        imgNormalized = imgResize / 255.0
        imgCrops.append(imgNormalized)

    imgCrops = np.array(imgCrops)
    predictions = model.predict(imgCrops)

    for i, pos in enumerate(posList):
        x, y = pos
        inID = np.argmax(predictions[i])
        label = class_dictionary[inID]

        if label == 'no_car':
            color = (0, 255, 0)
            thickness = 5
            spaceCounter += 1
            textColor = (0,0,0)
            if (i+1) not in outp:
                outp.append(i+1)
        else:
            color = (0, 0, 255)
            thickness = 2
            textColor = (255,255,255)
            if (i+1) in outp:
                outp.remove(i+1)

        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)
        font_scale = 0.5
        text_thickness = 1
        
        textSize = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, font_scale, text_thickness)[0]
        textX = x
        textY = y + height - 5
        cv2.rectangle(img, (textX, textY - textSize[1] - 5), (textX + textSize[0] + 6, textY + 2), color, -1)
        cv2.putText(img, label, (textX + 3, textY - 3), cv2.FONT_HERSHEY_SIMPLEX, font_scale, textColor, text_thickness)

    totalSpaces = len(posList)
    free_spaces = spaceCounter
    occupied_spaces = totalSpaces - spaceCounter
    return img

frame_skip =  10
frame_count = 0
def process_video():
    global frame,frame_count
    while True:
        success, img = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Restart video when complete
            continue

        if frame_count % frame_skip == 0:
            img = cv2.resize(img, (1280, 720))
            frame = checkParkingSpace(img)

        frame_count += 1

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    def generate_frames():
        while True:
            if frame is not None:
                ret, buffer = cv2.imencode('.jpg', frame)
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/space_count')
def space_count():
    print("available slots",outp)
    return jsonify(available_slots=outp)

if __name__ == "__main__":
    video_thread = Thread(target=process_video)
    video_thread.daemon = True
    video_thread.start()

    app.run()
