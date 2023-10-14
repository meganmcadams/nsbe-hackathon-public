from flask import Flask, render_template, jsonify, request
from _utils.voice import get_audio
from _utils.chat import get_response
import openai

# Initialize Flask app
app = Flask(__name__)
openai.api_key = "REDACTED"

# PAGES
@app.route('/')
def chat():
    character = "Yoda"
    return render_template('chat.html', character=character)

@app.route("/ask", methods=["GET"])
def ask_yoda():
    try:
        question = request.args.get("question")
        character = request.args.get("character")
        response = get_response(question, character, request.args.get("grammar"))
        audiofile = get_audio(response, character)

        # Store user prompt in MongoDB
        '''
        mongo.db.user_prompts.insert_one({
            'prompt': question,
            'character': character,
            'response': response
        })
        '''
        return jsonify({"result": response, "audiofile": audiofile})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 2024))
    app.run(debug=True, threaded=False, host='0.0.0.0', port=port)

