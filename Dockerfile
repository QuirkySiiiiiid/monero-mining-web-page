# Use Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

# Install Python dependencies
RUN pip install -r requirements.txt

# Start the Flask app
CMD ["python", "server.py"]
