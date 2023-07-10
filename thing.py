import json
with open("/var/www/html/source/dictionary.json", 'r+') as f:
    data = json.load(f)
    i = 0
    for entry in data:
        entry.append(i)
        i += 1
    f.seek(0)
    json.dump(data, f, indent=4)
    f.truncate()