from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import tensorflow as tf
from werkzeug.utils import secure_filename
import json
from bs4 import BeautifulSoup
import requests
import pandas as pd

# ------------------------------
# Initialisation de l'application
# ------------------------------
app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les routes

# ------------------------------
# Config pour Upload & Modèle
# ------------------------------
app.config['UPLOAD_FOLDER'] = 'static/uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Charger le modèle entraîné
model = tf.keras.models.load_model('./model/mon_modele.h5')

# Charger les noms de classes
with open('./model/class_names.json', 'r') as f:
    class_names = json.load(f)

IMAGE_SIZE = (224, 224)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def prepare_image(image_path):
    img = Image.open(image_path).convert("RGB")
    img = img.resize(IMAGE_SIZE)
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# ------------------------------
# Route : Prédiction d'image
# ------------------------------
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'Aucune image envoyée'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'Nom de fichier vide'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Format de fichier non pris en charge'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        img_array = prepare_image(filepath)
        preds = model.predict(img_array)
        idx = np.argmax(preds)
        prediction = class_names[idx]
        confidence = round(float(np.max(preds)) * 100, 2)

        return jsonify({
            'prediction': prediction,
            'confidence': confidence,
            'filename': filename
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------------------
# Fonctions Web Scraping Amazon
# ------------------------------
def get_title(soup):
    try:
        title = soup.find("span", attrs={"id": 'productTitle'})
        return title.text.strip() if title else ""
    except AttributeError:
        return ""

def get_price(soup):
    try:
        price = soup.find("span", attrs={'id': 'priceblock_ourprice'})
        if price:
            return price.string.strip()
        price = soup.find("span", attrs={'id': 'priceblock_dealprice'})
        if price:
            return price.string.strip()
        return "Price not available"
    except Exception:
        return "Price not available"

def get_rating(soup):
    try:
        rating = soup.find("i", attrs={'class': 'a-icon a-icon-star a-star-4-5'}).string.strip()
    except AttributeError:
        try:
            rating = soup.find("span", attrs={'class': 'a-icon-alt'}).string.strip()
        except:
            return ""
    return rating

def get_review_count(soup):
    try:
        review_count = soup.find("span", attrs={'id': 'acrCustomerReviewText'}).string.strip()
    except AttributeError:
        return ""
    return review_count

def get_availability(soup):
    try:
        available = soup.find("div", attrs={'id': 'availability'})
        return available.find("span").string.strip() if available else "Not Available"
    except AttributeError:
        return "Not Available"

# ------------------------------
# Route : Scraping Amazon
# ------------------------------
@app.route('/scrape', methods=['GET'])
def scrape():
    search_query = request.args.get('query', '')
    HEADERS = {'User-Agent': '', 'Accept-Language': 'en-US, en;q=0.5'}
    URL = f"https://www.amazon.com/s?k={search_query}"

    try:
        webpage = requests.get(URL, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "html.parser")

        links = soup.find_all("a", attrs={'class': 'a-link-normal s-no-outline'})
        links_list = ["https://www.amazon.com" + link.get('href') for link in links]

        data = {"title": [], "price": [], "rating": [], "reviews": [], "availability": []}

        for link in links_list:
            new_webpage = requests.get(link, headers=HEADERS)
            new_soup = BeautifulSoup(new_webpage.content, "html.parser")

            data['title'].append(get_title(new_soup))
            data['price'].append(get_price(new_soup))
            data['rating'].append(get_rating(new_soup))
            data['reviews'].append(get_review_count(new_soup))
            data['availability'].append(get_availability(new_soup))

        amazon_df = pd.DataFrame.from_dict(data)
        amazon_df['title'].replace('', np.nan, inplace=True)
        amazon_df.dropna(subset=['title'], inplace=True)

        csv_file = 'scraped_data.csv'
        amazon_df.to_csv(csv_file, index=False)

        return jsonify({
            'data': amazon_df.to_dict(orient='records'),
            'download_url': f'/download/{csv_file}'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ------------------------------
# Route : Télécharger CSV
# ------------------------------
@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    return send_file(filename, as_attachment=True)

# ------------------------------
# Lancement de l'application
# ------------------------------
if __name__ == '__main__':
    app.run(debug=True)
