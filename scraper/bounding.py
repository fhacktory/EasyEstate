import requests
import xmltodict
import firebase

BOX = {
    "69001": { "n": 45.774759, "s": 45.764545, "e": 4.839808, "w": 4.813108},
    "69002": { "n": 45.766276, "s": 45.726476, "e": 4.839839, "w": 4.813066},
    "69003": { "n": 45.763752, "s": 45.739012, "e": 4.898367, "w": 4.838456},
    "69004": { "n": 45.789748, "s": 45.771119, "e": 4.843068, "w": 4.809064},
    "69005": { "n": 45.767978, "s": 45.744242, "e": 4.830523, "w": 4.771831},
    "69006": { "n": 45.787146, "s": 45.763550, "e": 4.869971, "w": 4.839491},
    "69007": { "n": 45.756760, "s": 45.707363, "e": 4.859982, "w": 4.818722},
    "69008": { "n": 45.749425, "s": 45.718774, "e": 4.892171, "w": 4.847618},
    "69009": { "n": 45.808283, "s": 45.758664, "e": 4.841315, "w": 4.784016},
    "69100": { "n": 45.795535, "s": 45.748451, "e": 4.921279, "w": 4.858354},
    "69160": { "n": 45.776907, "s": 45.750228, "e": 4.792669, "w": 4.711592},
    "69110": { "n": 45.751766, "s": 45.720789, "e": 4.813389, "w": 4.771719},
    "69200": { "n": 45.730706, "s": 45.671608, "e": 4.911352, "w": 4.849807},
    "69800": { "n": 45.725998, "s": 45.676823, "e": 5.000133, "w": 4.895025},
    "69500": { "n": 45.752929, "s": 45.717980, "e": 4.936515, "w": 4.886818},
    "69120": { "n": 45.811162, "s": 45.744313, "e": 4.970379, "w": 4.879318},
    "69300": { "n": 45.818321, "s": 45.778901, "e": 4.880621, "w": 4.818992},
    "69130": { "n": 45.800863, "s": 45.763612, "e": 4.795187, "w": 4.752347},
}
URL = "http://overpass-api.de/api/interpreter"
AMENITIES = [
    "bar",
    "restaurant",
    "cafe",
    "bicycle_rental",
    "coworking_space"
]

def fetch_amenities(zipcode, amenities):
    data = ""
    box = BOX[zipcode]
    for amenity in amenities:
        data += "node [amenity={}] ({},{},{},{});out;".format(
            amenity, box["s"], box["w"], box["n"], box["e"]
        )
    return requests.post(URL, {"data": data})

def request_to_db(db, request, zipcode):
    osm = xmltodict.parse(request.content)
    for node in osm["osm"]["node"]:
        if type(node["tag"]) == list:
            tags = set([tag["@v"] for tag in node["tag"]])
        else:
            tags = set([node["tag"]["@v"]])
        tags = tags.intersection(AMENITIES)
        for tag in tags:
            db.post_async('/amenities/{}/nodes/{}'.format(zipcode, tag), {
                "lat": node["@lat"],
                "lon": node["@lon"],
            })

def main():
    db = firebase.FirebaseApplication('https://fiery-fire-2189.firebaseio.com', None)
    for zipcode in BOX:
        request_to_db(
            db, fetch_amenities(zipcode, AMENITIES), zipcode
        )

if __name__ == "__main__":
    main()
