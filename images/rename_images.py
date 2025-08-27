import os
from pathlib import Path

def rename_images_in_folder(folder_path):
    """Rename all images in a folder to sequential numbers"""
    extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')
    files = [f for f in folder_path.iterdir() if f.is_file() and f.suffix.lower() in extensions]
    
    for index, file in enumerate(sorted(files), start=1):
        new_name = f"{index}{file.suffix}"
        new_path = folder_path / new_name
        
        # Handle potential name conflicts
        counter = 1
        while new_path.exists():
            new_name = f"{index}_{counter}{file.suffix}"
            new_path = folder_path / new_name
            counter += 1
            
        try:
            file.rename(new_path)
            print(f"Renamed: {file.name} → {new_name}")
        except Exception as e:
            print(f"Error renaming {file.name}: {e}")

def main():
    images_folder = Path(".")  # Current folder (where the script is)
    
    # Process each subfolder
    for subfolder in images_folder.iterdir():
        if subfolder.is_dir():
            print(f"\nProcessing folder: {subfolder.name}")
            rename_images_in_folder(subfolder)
    
    print("\nAll folders processed!")

if __name__ == "__main__":
    main()