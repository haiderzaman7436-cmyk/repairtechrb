import os
from rembg import remove
from PIL import Image

input_path = r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images\laptop-parts-chargers\18w_asus-acer-etc.jpg.jpeg"
output_path = r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images\laptop-parts-chargers\test_output.jpg"

try:
    with open(input_path, 'rb') as i:
        input_data = i.read()
    
    # Remove background (and watermarks along with it)
    subject_data = remove(input_data)
    
    # We now have the subject with a transparent background.
    # Let's composite it onto a white background so it looks like the original but without watermarks.
    import io
    subject_img = Image.open(io.BytesIO(subject_data)).convert("RGBA")
    
    # Create white background
    white_bg = Image.new("RGB", subject_img.size, (255, 255, 255))
    white_bg.paste(subject_img, mask=subject_img.split()[3]) # paste using alpha channel as mask
    
    white_bg.save(output_path, "JPEG")
    print("Test image processed successfully.")
except Exception as e:
    print(f"Error processing image: {e}")
