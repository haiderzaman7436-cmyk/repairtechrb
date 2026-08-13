import os
from PIL import Image
from rembg import remove

dirs = [
    r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images\laptop-parts-chargers",
    r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images\latop-parts-batteries",
    r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images\laptop-parts-keyboards",
    r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images\laptop-parts-memory",
    r"c:\Users\haide\OneDrive\Desktop\RepairTech\public\images\laptop-parts-storage"
]

processed_count = 0
failed_count = 0

for d in dirs:
    if not os.path.exists(d):
        continue
    for filename in os.listdir(d):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            filepath = os.path.join(d, filename)
            try:
                with Image.open(filepath) as input_img:
                    # Remove the background
                    output_img = remove(input_img)
                    
                    # Create a solid white background
                    white_bg = Image.new("RGBA", output_img.size, (255, 255, 255, 255))
                    
                    # Paste the background-removed image onto the white background using its alpha channel as mask
                    white_bg.paste(output_img, (0, 0), output_img)
                    
                    # Convert to RGB (removes alpha) before saving as JPEG or keeping original extension if not PNG
                    final_img = white_bg.convert('RGB')
                    
                    final_img.save(filepath)
                    processed_count += 1
                    
                    if processed_count % 10 == 0:
                        print(f"Processed {processed_count} images so far...")
                        
            except Exception as e:
                failed_count += 1
                print(f"Failed to process {filepath}: {e}")

print(f"\nCompleted! Successfully processed {processed_count} images.")
if failed_count > 0:
    print(f"Failed on {failed_count} images.")
