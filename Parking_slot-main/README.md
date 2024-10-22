# Parking Slot Detector using CNN

## Overview

This project is a parking slot detection system that allows users to select parking slots in an image using a mouse interface, train a CNN model to identify filled and empty parking slots, and deploy a real-time detection application using a Flask web app. The system uses an ImageNet pre-trained architecture for classification and provides real-time updates for the status of each slot (filled or empty).

## Features
- Select parking slots on images using a GUI (`dataCollector.py`).
- Train a Convolutional Neural Network (CNN) on the selected parking slots.
- Detect and classify parking slots as either **Filled** or **Empty** in real-time.
- Deploy a Flask web application for real-time parking slot monitoring.
- Color-coded markers (e.g., green for empty, red for filled) display slot status.

## Installation

### Requirements
-numpy==1.24.4
-Flask==2.1.3
-tensorflow==2.9.2
-werkzeug==2.0.3
-keras==2.9.0
-opencv-python
-opencv-contrib-python
-matplotlib
-scipy
-pillow

### Setting up the Environment

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/parking-slot-detector.git
   cd parking-slot-detector
   ```

2. **Install Dependencies:**
   It’s recommended to create a virtual environment before installing dependencies.
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. **Run the Application Locally:**
   After setting up and training the model (detailed below), run the application:
   ```bash
   python main.py
   ```

## Workflow

### Step 1: Collecting Parking Slot Data
The first step is to collect data for the parking slots using `dataCollector.py`.

1. Run `dataCollector.py`:
   ```bash
   python dataCollector.py
   ```
2. Using the left mouse button, select and label the parking slots on the input image. For each selected slot, save its coordinates and label whether it's empty or filled.
   
3. Save the labeled slots as images in their respective folders (`empty/` or `filled/`), ensuring your dataset is organized correctly for the CNN model training.

### Step 2: Training the CNN Model
Once you’ve collected sufficient data, you can train your CNN model using a pre-trained ImageNet architecture.

1. Modify and run jupyter notebook file, ensuring that:
   - The training images are organized in folders corresponding to each class (e.g., `empty/` and `filled/`).
   - The model architecture (ResNet in this case) is loaded, and transfer learning is applied.

2. The trained model will be saved (e.g., `parking_model.h5`), ready to be used for real-time detection.

### Step 3: Real-Time Detection
For real-time parking slot detection, the `main.py` file runs a Flask web app that serves live parking slot status using the trained CNN model.

1. **Run the Flask Application:**
   ```bash
   python main.py
   ```
2. The application will start a local server. Visit `http://localhost:5000` in your browser to view the real-time parking slot detection.

### Step 4: Checking Parking Slot Status
The system checks each selected slot, processes the corresponding image region, and classifies it as **Empty** or **Filled** using the trained CNN model.

- **Real-Time Update:** 
  Each slot's status is updated continuously based on the live video feed or input image, using color markers for visual feedback.

## File Structure

parking-slot-detector/
│
├── dataCollector.py      # For collecting parking slot data manually.
├── train_model.py        # Script for training the CNN model.
├── app.py                # Flask application for real-time parking slot detection.
├── static/               # Contains static assets (e.g., CSS, images).
├── templates/            # HTML templates for the Flask app.
├── models/               # Pre-trained models and saved CNN models.
├── data/                 # Folder to save the training data.
│   ├── empty/            # Images of empty parking slots.
│   └── filled/           # Images of filled parking slots.
└── requirements.txt      # List of dependencies.


## How It Works

1. **Slot Selection:** The parking slots are selected and labeled using a GUI interface. The coordinates of these slots are saved and the images are stored in appropriate class folders.
2. **Training:** A CNN model is trained using a pre-trained architecture (e.g., ResNet or MobileNet) for transfer learning on the parking slot data. This model classifies slots into two categories: empty or filled.
3. **Detection & Real-Time Updates:** The real-time detection is handled by the Flask app, which processes the video feed or image input, classifies the slots, and updates the status dynamically with colored markers.

## Future Enhancements
- Add support for multi-camera systems to monitor larger parking areas.
- Implement a notification system to alert users about available parking slots.
- Add the ability to detect and track cars for more accurate updates.

## License
This project is licensed under the MIT License.
