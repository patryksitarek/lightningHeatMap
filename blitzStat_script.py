import websockets
import json, asyncio
import sqlite3
import requests
from datetime import datetime, timedelta
from time import sleep
 
 
async def main():
    
    #SETTINGS
    bounds = {
        "north": 55,
        "south": 49,
        "west": 14,
        "east": 25
    }
 
    API_KEY = "!!!API KEY HERE!!!"
    server_url = "http://35.234.105.90/api/update/" + API_KEY
    url = "wss://ws5.blitzortung.org:3000"
    db_file =  "lightningCoords.db"
    table_name = "lightnings"



    last = None
    pl_strikes = []

    connection = sqlite3.connect(db_file)
    cursor = connection.cursor()

    query = "CREATE TABLE IF NOT EXISTS " + table_name + " (LATITUDE REAL, LONGITUDE REAL, DATE TEXT)"
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    print(str(datetime.now()) + " database initialized")

    async with websockets.connect(url) as ws:
        print("Hello!")
        last_save = datetime.now()
        while True:
            if last is None or (datetime.now() - last).total_seconds() >= 40:
                await ws.send("{}")
                last = datetime.now()
 
            response = await ws.recv()
            strike = json.loads(response)
            lat = strike["lat"]
            lon = strike["lon"]
            
            if (bounds["north"] >= lat >= bounds["south"] and bounds["east"] >= lon >= bounds["west"]):
                pl_strikes.append({"LATITUDE": lat, "LONGITUDE": lon, "DATE": str(datetime.now())})
                if  ((len(pl_strikes) == 500) or (datetime.now() - last_save > timedelta(minutes = 15) and len(pl_strikes) > 0)):
                    save_data(db_file, table_name, pl_strikes)
                    r = requests.post(server_url, json={"data": pl_strikes})
                    print(r)
                    print(r.text)
                    pl_strikes = []
                    last_save = datetime.now()
                    print(str(datetime.now()) + " new records!")



def save_data(db_file, table_name, strikes):
    connection = sqlite3.connect(db_file)
    cursor = connection.cursor()

    query = "INSERT INTO " + table_name + " (LATITUDE, LONGITUDE, DATE) VALUES "
    for i in strikes:
        query += "(" + str(i["LATITUDE"]) + ", " + str(i["LONGITUDE"]) + ", '" + str(i["DATE"]) + "'),"
    cursor.execute(query[:-1])
    connection.commit()
    print(str(datetime.now()) + " data saved")

    cursor.close()
    connection.close()


loop = asyncio.get_event_loop()

while True:
    if not loop.is_running():
        try:
            loop.run_until_complete(main())
        except Exception as e:
            print("Oops! ", e)
    else:
        sleep(30)
