from flask import Flask
from flask import request
app = Flask(__name__)

@app.route("/", methods=['POST'])
def hello():
    requestJSON = request.form['test']
    print(requestJSON)
    return requestJSON

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8004)
