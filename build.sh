#!/bin/bash

# List of docker-compose files
compose_files=(
  "mysql-build.yml"
  "backend-build.yml"
  "frontend-build.yml"
  "react-build.yml"
  "react-app-build.yml"
)

# Check if files exist
for file in "${compose_files[@]}"; do
  if [[ ! -f $file ]]; then
    echo "Error: File '$file' not found."
    exit 1
  fi
done

# Display options
echo "Choose which image to build:"
for i in "${!compose_files[@]}"; do
  echo "$((i + 1)). ${compose_files[$i]}"
done
echo "$(( ${#compose_files[@]} + 1 )). Build all"
echo "$(( ${#compose_files[@]} + 2 )). Exit"

# Get user choice
read -p "Enter the number of your choice: " choice

# Validate input
if [[ "$choice" -ge 1 && "$choice" -le ${#compose_files[@]} ]]; then
  # Build selected file
  selected_file="${compose_files[$((choice - 1))]}"
  echo "Building images using $selected_file..."
  docker-compose -f "$selected_file" build
  if [[ $? -eq 0 ]]; then
    echo "Build completed successfully!"
  else
    echo "Error occurred during the build using $selected_file."
  fi

elif [[ "$choice" -eq $(( ${#compose_files[@]} + 1 )) ]]; then
  # Build all files
  echo "Building images using all compose files..."
  for file in "${compose_files[@]}"; do
    echo "Building images using $file..."
    docker-compose -f "$file" build
    if [[ $? -ne 0 ]]; then
      echo "Error occurred during the build using $file."
      exit 1
    fi
  done
  echo "All builds completed successfully!"

elif [[ "$choice" -eq $(( ${#compose_files[@]} + 2 )) ]]; then
  # Exit
  echo "Exiting without building."
  exit 0

else
  echo "Invalid choice. Please run the script again and select a valid option."
  exit 1
fi
