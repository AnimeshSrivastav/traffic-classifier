
const classMapping = {
  0: "Speed Limit 20 km/h",
  1: "Speed Limit 30 km/h",
  2: "Speed Limit 50 km/h",
  3: "Speed Limit 60 km/h",
  4: "Speed Limit 70 km/h",
  5: "Speed Limit 80 km/h",
  6: "End of Speed Limit 80 km/h",
  7: "Speed Limit 100 km/h",
  8: "Speed Limit 120 km/h",
  9: "No passing",
  10: "No passing for vehicles over 3.5 tons",
  11: "Right-of-way at the next intersection",
  12: "Priority road",
  13: "Yield",
  14: "Stop",
  15: "No vehicles",
  16: "Vehicles > 3.5 tons prohibited",
  17: "No entry",
  18: "General caution",
  19: "Dangerous curve left",
  20: "Dangerous curve right",
  21: "Double curve",
  22: "Bumpy road",
  23: "Slippery road",
  24: "Road narrows on the right",
  25: "Road work",
  26: "Traffic signals",
  27: "Pedestrians",
  28: "Children crossing",
  29: "Bicycles crossing",
  30: "Beware of ice/snow",
  31: "Wild animals crossing",
  32: "End of all speed and passing limits",
  33: "Turn right ahead",
  34: "Turn left ahead",
  35: "Ahead only",
  36: "Go straight or right",
  37: "Go straight or left",
  38: "Keep right",
  39: "Keep left",
  40: "Roundabout mandatory",
  41: "End of no passing",
  42: "End of no passing by vehicles over 3.5 tons",
};



const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("predictBtn").addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    alert("Please upload an image first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("https://traffic-classifier-xvqk.onrender.com/predict", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Prediction failed");
    const data = await res.json();

    const predictedClass =
      classMapping[data.predicted_class] || "Unknown class";

    document.getElementById(
      "result"
    ).innerHTML = `<strong>Predicted:</strong> ${predictedClass}`;
  } catch (err) {
    console.error(err);
    alert("Error predicting image.");
  }
});

