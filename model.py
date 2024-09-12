import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Set up the WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

# Open the URL
driver.get('https://www.wilhelmina.com/new-york/sports-fitness/women')

# Wait for the page to load
time.sleep(5)

# Find all model containers
model_containers = driver.find_elements(By.CLASS_NAME, 'model-card')  # Adjust the class name based on actual HTML structure

# List to hold model data
models_data = []

if not model_containers:
    print("No model containers found. Please check the class name.")
else:
    for model in model_containers:
        # Hover over the model container to reveal the information
        ActionChains(driver).move_to_element(model).perform()
        time.sleep(1)  # Wait for the information to appear

        try:
            # Extract the information
            name = model.find_element(By.CLASS_NAME, 'model-name').text.strip()  # Adjust the class name based on actual HTML structure
            height = model.find_element(By.CLASS_NAME, 'height').text.strip()
            bust = model.find_element(By.CLASS_NAME, 'bust').text.strip()
            bra = model.find_element(By.CLASS_NAME, 'bra').text.strip()
            waist = model.find_element(By.CLASS_NAME, 'waist').text.strip()
            hips = model.find_element(By.CLASS_NAME, 'hips').text.strip()
            shoe = model.find_element(By.CLASS_NAME, 'shoe').text.strip()
            hair = model.find_element(By.CLASS_NAME, 'hair').text.strip()
            eyes = model.find_element(By.CLASS_NAME, 'eyes').text.strip()
            dress_size = model.find_element(By.CLASS_NAME, 'dress-size').text.strip()

            # Append the data to the list
            models_data.append({
                'Name': name,
                'Height': height,
                'Bust': bust,
                'Bra': bra,
                'Waist': waist,
                'Hips': hips,
                'Shoe': shoe,
                'Hair': hair,
                'Eyes': eyes,
                'Dress Size': dress_size
            })
        except Exception as e:
            print(f"Error extracting data for a model: {e}")

# Close the WebDriver
driver.quit()

# Create a DataFrame from the list
df = pd.DataFrame(models_data)

# Save the DataFrame to an Excel file
output_path = 'C:/Users/bakoe/Downloads/models_data.xlsx'
df.to_excel(output_path, index=False)

print(f"Data saved to {output_path}")