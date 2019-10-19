import sys, os, requests, gspread
from flask import Flask, request, url_for, render_template, jsonify
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)
@app.route('/')
def scrapeCrimelog():
    scope = ['https://spreadsheets.google.com/feeds',
             'https://www.googleapis.com/auth/drive']
    credentials = ServiceAccountCredentials.from_json_keyfile_name('api_key.json', scope)
    gc = gspread.authorize(credentials)
    url = "https://docs.google.com/spreadsheets/d/12_iuy8fyGuZ8KreBWNmaJirSsSmD1Lf3D10UVDUJ3rc/edit#gid=0"

    log = gc.open_by_url(url).sheet1.col_values(1)

    crime_Dict = {
                    "crimes": [
                        {
                            "crime": "unauthorized entry",
                            "count": 0
                        },
                        {
                            "crime": "marijuana",
                            "count": 0
                        },
                        {
                            "crime": "controlled substance",
                            "count": 0
                        },
                        {
                            "crime": "drug paraphernalia",
                            "count": 0
                        },
                        {
                            "crime": "underage consumption",
                            "count": 0
                        },
                        {
                            "crime": "poss. of alcohol",
                            "count": 0
                        },
                        {
                            "crime": "golf cart",
                            "count": 0
                        },
                        {
                            "crime": "assault",
                            "count": 0
                        },
                        {
                            "crime": "rape",
                            "count": 0
                        },
                        {
                            "crime": "breaking and entering",
                            "count": 0
                        },
                        {
                            "crime": "larceny",
                            "count": 0
                        },
                        {
                            "crime": "injury",
                            "count": 0
                        },
                        {
                            "crime": "vehicle",
                            "count": 0
                        },
                        {
                            "crime": "traffic stop",
                            "count": 0
                        },
                        {
                            "crime": "fondling",
                            "count": 0
                        },
                        {
                            "crime": "scam",
                            "count": 0
                        },
                        {
                            "crime": "trespass",
                            "count": 0
                        },
                        {
                            "crime": "suspicious",
                            "count": 0
                        },
                        {
                            "crime": "fraud",
                            "count": 0
                        },
                        {
                            "crime": "forgery",
                            "count": 0
                        },
                        {
                            "crime": "vandalism",
                            "count": 0
                        },
                        {
                            "crime": "hit and run",
                            "count": 0
                        },
                        {
                            "crime": "traffic crash",
                            "count": 0
                        }
                        ]}

    #for key in crime_Dict[0]:    #loops through keys in crimeDict
     #   for entry in log:     #loops through entries in crimeLog
      #      if key in entry.lower():    #if the key is the crimeLog entry
       #         crime_Dict[key] += 1    #increment by one
         
    crimes = crime_Dict['crimes']
    
    for crime in crimes:
        for entry in log:
            if crime['crime'] in entry.lower():
                crime['count'] += 1
        
    return jsonify(crime_Dict)
    #print(crime_Dict)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    #scrapeCrimelog()
    port = int(os.environ.get('PORT', 3000))
    app.run('localhost', port)
