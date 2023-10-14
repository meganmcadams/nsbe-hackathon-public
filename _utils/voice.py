from fakeyou import FakeYou
from time import sleep

def get_audio(text, character_name):
    # Create an instance of FakeYou
    fake_you = FakeYou()

    # Input your credentials
    username = "megocakes2"
    password = "password"

    print("\n\nCharacter name:\"",character_name,"\"",sep="")

    print("Trying to log in!")

    try:
        # Log in
        fake_you.login(username, password)
        print("Logged in successfully!")

        if character_name == "Yoda":
            tts_model_token = "TM:ydfm7kj9kdwh"
        elif character_name == "Harry Potter" or character_name == "Harry_Potter":
            tts_model_token = "TM:nrwkc2acr6wa"
        elif character_name == "Walter White" or character_name == "Walter_White":
            tts_model_token = "TM:8afk285jc2gs"
        elif character_name == "Spongebob":
            tts_model_token = "TM:4hy6m7f7zeny"
        elif character_name == "Shrek":
            tts_model_token = "TM:9we07s0pq85h"
        else: # default is yoda
            tts_model_token = "TM:ydfm7kj9kdwh"

        # Create a text-to-speech job
        job_token = fake_you.make_tts_job(text, tts_model_token)
        print(f"Text-to-speech job created with token: {job_token}")

        # Poll for the job status
        max_rounds = 10
        rounds = 0
        while True:
            if rounds > max_rounds:
                return None

            job_status = fake_you.tts_status(job_token)
            print(f"Job status: {job_status}")

            
            if job_status == "complete_success":
                # Job is complete, retrieve the synthesized audio
                synthesized_audio = fake_you.tts_poll(job_token)
                return str(synthesized_audio.link)

            elif job_status in ["dead", "attempt_failed"]:
                print("Job failed.")
                return None
            
            else:
                print(rounds)
                sleep(1)
            rounds+=1
            

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        # Logout to clear the session
        fake_you.logout()
        print("Logged out.")
    return None