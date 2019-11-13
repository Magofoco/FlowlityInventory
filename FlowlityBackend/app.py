from flask import Flask, request
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)

search_json = {}
results_json = {}
all_products_dates_json = {}


@app.route('/api/search', methods=['POST'])
def search():
    with open('./my_data.json', 'r') as f:
        search_json['results'] = json.load(f)
        products = search_json["results"]

    selected_products = []
    results = []
    if request.method == 'POST':
        my_request = request.get_json()
        searched_ids = [int(x) for x in my_request['products_query']]
        for product in products:
            if product["product_id"] in searched_ids:
                selected_products.append(product)
        search_json["results"] = selected_products

        selected_dates = my_request['dates_query']
        final_results = {}

        for product_id in searched_ids:
            final_results['product_id'] = product_id
            dates = []
            inventory = []
            name = []
            color = []
            for product in products:
                if product_id == product['product_id']:
                    dates.append(product['date'])
                    inventory.append(product['inventory_level'])
                    name.append(product['product_name'])
                    color.append(product['color'])
            final_results['product_name'] = name[0]
            final_results['color'] = color[0]
            final_results['dates'] = dates
            final_results['inventory'] = inventory

            results.append(final_results.copy())

        results_json['selected_products'] = results
        results_json['selected_dates'] = selected_dates
        return results_json


@app.route('/api/results', methods=['GET'])
def results():
    if request.method == 'GET':
        return results_json


@app.route('/api/all_products_dates', methods=['GET'])
def all_products_dates():
    if request.method == 'GET':
        all_products = []
        all_dates = []
        products_dates = []
        with open('./my_data.json', 'r') as f:
            products_json = json.load(f)
        for i in range(0, len(products_json)):
            if products_json[i]['product_name'] not in all_products:
                all_products.append(products_json[i]['product_name'])
            if products_json[i]['date'] not in all_dates:
                all_dates.append(products_json[i]['date'])
        products_dates.append(all_products)
        products_dates.append(all_dates)
        all_products_dates_json["products_dates"] = products_dates
        return all_products_dates_json


@app.route('/api/updating_inventory', methods=['POST'])
def updating():
    if request.method == 'POST':

        my_request = request.get_json()

        with open('./my_data.json', 'r+') as f:
            products_json = json.load(f)
            for product_json in products_json:
                if product_json['date'] == my_request['single_date'] and product_json['product_name'] == my_request['single_name']:
                    product_json['inventory_level'] = int(my_request['new_inventory'])
                    print(my_request['new_inventory'])
                    print(product_json['inventory_level'])
            f.seek(0)
            json.dump(products_json, f, indent=4)
            f.truncate()

        return my_request


if __name__ == '__main__':
    app.run()
