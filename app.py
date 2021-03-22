from flask import Flask, jsonify, render_template, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('about.html')


@app.route('/hello/<string:person>')
def hello(person='world'):
    return jsonify(name=f"Hello {person.capitalize()}")


@app.route('/search/<string:goal>')
def search(goal):
    BUFFER = 1000
    EXTRA_DATA_SIZE = 30

    if len(goal) == 0:
        return jsonify(
            status=200,
            message='This was an empty search term and thus only PI was returned',
            posFoundAt=-1,
            extraData='3.141592653589793238'
        )

    # HERE WE READ THE FILE WITH A MILLION DIGITS OF PI
    with open('pi-quater-billion.txt', 'r') as FILE:
        FILE_SIZE = FILE.seek(0, 2)
        FILE.seek(0)

        # IF THE SEARCH TERM IS EVER GREATER THAN THE SEARCH SPACE THIS CONDITION WILL CATCH IT
        if len(goal) >= BUFFER:
            return jsonify(
                status=404,
                message=f"The search term is longer than the limit which is {BUFFER}",
                posFoundAt=-1,
                extraData=''
            )

        while True:
            section = FILE.read(BUFFER)

            if not section:
                return jsonify(
                    status=404,
                    message='This search term was not found in the first million digits of pi',
                    posFoundAt=-1,
                    extraData=''
                )

            index = section.find(goal)
            if index >= 0:
                pos_at_found = FILE.tell() + index - BUFFER + 1

                # HERE I AM TRANSLATING TO THE INDEX FOUND AND THEN I WILL READ THE EXTRA DATA NEEDED
                # I AM TRANSLATING TO ONE POS BEFORE THE INDEX SO THAT THE SEARCH TERM IS INCLUDED
                FILE.seek(pos_at_found-1)
                extra_data = FILE.read(EXTRA_DATA_SIZE)
                return jsonify(
                    status=200,
                    message="yep all good",
                    posFoundAt=pos_at_found,
                    extraData=extra_data
                )

            if FILE.tell() == FILE_SIZE:
                return jsonify(
                    status=200,
                    message="This section not found in the first million digits of PI",
                    posFoundAt=-1,
                    extraData=''
                )


if __name__ == "__main__":
    app.run(debug=False)
