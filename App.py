from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors

app = Flask(__name__)

CORS(app)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Aniket'  # Change with your own password
app.config['MYSQL_DB'] = 'sakila'

mysql = MySQL(app)

# -------------------- Country CRUD --------------------

# Get all countries
@app.route('/countries', methods=['GET'])
def get_countries():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM country")
    countries = cursor.fetchall()
    return jsonify(countries)

# Add a new country
@app.route('/countries', methods=['POST'])
def add_country():
    data = request.json
    country_name = data['country']
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO country (country) VALUES (%s)", (country_name,))
    mysql.connection.commit()
    return jsonify({'message': 'Country added successfully'}), 201

# Update an existing country
@app.route('/countries/<int:country_id>', methods=['PUT'])
def update_country(country_id):
    data = request.json
    country_name = data['country']
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE country SET country = %s WHERE country_id = %s", (country_name, country_id))
    mysql.connection.commit()
    return jsonify({'message': 'Country updated successfully'})

# Delete a country
@app.route('/countries/<int:country_id>', methods=['DELETE'])
def delete_country(country_id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM country WHERE country_id = %s", (country_id,))
    mysql.connection.commit()
    return jsonify({'message': 'Country deleted successfully'})


# -------------------- Language CRUD --------------------

# Get all languages
@app.route('/languages', methods=['GET'])
def get_languages():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM language")
    languages = cursor.fetchall()
    return jsonify(languages)

# Add a new language
@app.route('/languages', methods=['POST'])
def add_language():
    data = request.json
    language_name = data['language']
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO language (language) VALUES (%s)", (language_name,))
    mysql.connection.commit()
    return jsonify({'message': 'Language added successfully'}), 201

# Update an existing language
@app.route('/languages/<int:language_id>', methods=['PUT'])
def update_language(language_id):
    data = request.json
    language_name = data['language']
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE language SET language = %s WHERE language_id = %s", (language_name, language_id))
    mysql.connection.commit()
    return jsonify({'message': 'Language updated successfully'})

# Delete a language
@app.route('/languages/<int:language_id>', methods=['DELETE'])
def delete_language(language_id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM language WHERE language_id = %s", (language_id,))
    mysql.connection.commit()
    return jsonify({'message': 'Language deleted successfully'})


# -------------------- Category CRUD --------------------

# Get all categories
@app.route('/categories', methods=['GET'])
def get_categories():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM category")
    categories = cursor.fetchall()
    return jsonify(categories)

# Add a new category
@app.route('/categories', methods=['POST'])
def add_category():
    data = request.json
    category_name = data['category']
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO category (category) VALUES (%s)", (category_name,))
    mysql.connection.commit()
    return jsonify({'message': 'Category added successfully'}), 201

# Update an existing category
@app.route('/categories/<int:category_id>', methods=['PUT'])
def update_category(category_id):
    data = request.json
    category_name = data['category']
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE category SET category = %s WHERE category_id = %s", (category_name, category_id))
    mysql.connection.commit()
    return jsonify({'message': 'Category updated successfully'})

# Delete a category
@app.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM category WHERE category_id = %s", (category_id,))
    mysql.connection.commit()
    return jsonify({'message': 'Category deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True)

