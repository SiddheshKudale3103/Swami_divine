import os

def rename_images(folder_path: str, prefix: str = "Seva-photo"):
    # Get all files in the folder
    files = os.listdir(folder_path)
    
    # Filter only image files
    image_files = [f for f in files if f.lower().endswith(('.jpeg', '.jpg', '.png'))]
    
    # Sort them to rename sequentially
    image_files.sort()

    # Ask user for last used number
    try:
        last_num = int(input("Enter the last image number used: "))
    except ValueError:
        print("Invalid input. Please enter a number.")
        return
    
    # Rename files
    for i, file_name in enumerate(image_files, start=1):
        ext = os.path.splitext(file_name)[1]  # keep original extension
        new_name = f"{prefix}-{last_num + i}{ext}"
        src = os.path.join(folder_path, file_name)
        dst = os.path.join(folder_path, new_name)
        
        os.rename(src, dst)
        print(f"Renamed: {file_name} -> {new_name}")

    print("\n✅ Renaming complete!")


if __name__ == "__main__":
    folder = input("Enter folder path containing images: ").strip()
    if os.path.isdir(folder):
        rename_images(folder)
    else:
        print("⚠️ Invalid folder path.")
