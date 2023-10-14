# import open ai
import openai

openai.api_key = "REDACTED"

def get_response(question, character, grammar = False):
    if grammar == 'true' or grammar == True:
        addition = "Also, please point out any spelling or grammar mistakes I made."
    else:
        addition = ""
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Please respond to this question as the character {character}: \"{question}\" {addition}",
            temperature=0.7,
            max_tokens=400  # Adjust the max_tokens value based on the desired length
        )

        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error: {str(e)}"