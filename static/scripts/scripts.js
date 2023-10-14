var intro_done = false;
var locked = false;

function close_instructions() {
    instructions = document.getElementById('instructions');
    instructions.style = "display: none;";
}

function inputcheck(event) {
    if (event.keyCode == 13 || event.which == 13) {
        askYoda();
    }
}

function yoda_error(character) {
    let newElement = document.createElement('AUDIO');
    newElement.setAttribute('src', `static/assets/DNU/${character.replaceAll(' ','_')}.wav`);
    newElement.setAttribute('autoplay', true);
    newElement.addEventListener("ended", () => {
        newElement.remove();
    });
    document.getElementById('result').appendChild(newElement);

    let text = ""
    if (character == 'Harry_Potter') { text = "Sorry, Hermione cast a do-not-understand-your-question hex on me, I didn't understand your question."; }
    else if (character == 'Spongebob') { text = "Squidward blew his clarinet in my ear because Patrick and I went LOOLOOLOOLOOLOOLOO, I couldn't understand your question."; }
    else if (character == 'Walter_White') { text = "Sorry, I was cleaning pizza off the roof, and didn't understand your question."; }
    else if (character == 'Yoda') { text = "A disturbance in The Force, I feel. Understand your question, I did not."; }
    else if (character == 'Shrek') { text = "If that question were an onion, I'd say it has way too many layers. Simplify it for this simple ogre."; }

    let chatbubble = document.createElement('div');
    chatbubble.innerHTML = `${character.replaceAll("_", " ")}: ${text}`;
    chatbubble.setAttribute('class', 'textbox received');
    document.getElementById('history').appendChild(chatbubble);
}

function get_script(character, num) {
    if (character == 'Yoda') {
        switch(num) {
            case 1:
                return "Obi-Wan said the same once, he did. Wise words, he often spoke. Hmm, say what, did I?";
            case 2:
                return "Patience, you must have. The Force, it will guide my answer. Mmmmm!";
            case 3:
                return "My answer will come in the future, it shall, young one.";
            case 4:
                return "Interesting, feel the Force, I do.";
            case 5:
                return "Hmm, think, I must.";
            case 6:
                return "Hmm, the answer I seek, in the Force, it lies. Meditate I must.";
            case 7:
                return "The Force, like a river, flows slowly. Await the current of knowledge, you must.";
            case 8:
                return "Hmm, your question, I ponder.";
            case 9:
                return "Patience, young one.";
            case 10:
                return "In stillness, the answers reveal themselves. Wait, you must.";
        }
    } else if (character == 'Walter_White') {
        switch(num) {
            case 1:
                return "Does Raisin Bran crunch? Hold on a moment.";
            case 2:
                return "Hmm, that requires me to apply myself in thought.";
            case 3:
                return "Whew, I think Gus is on to me. Hold on a second.";
            case 4:
                return "Walter Jr. is out with Louis. I'm glad we can talk.";
            case 5:
                return "Jesse, we need to think of a response now.";
            case 6:
                return "I've been contemplating, and I think it's time I make a move and answer your question.";
            case 7:
                return "Its occurred to me that I need to revise my answering strategy.";
            case 8:
                return "I've been running some numbers, and I believe there's a solution to your prompt.";
            case 9:
                return "I've had a revelation, and I think I've found a way to respond to this.";
            case 10:
                return "I've been cooking up an idea, and it's time to share it with you.";
        }
    } else if (character == 'Harry_Potter') {
        switch(num) {
            case 1:
                return "Wingardium Leviosa, LeviOOsa. Sorry, I was practicing.";
            case 2:
                return "Hold on, lemme purchase something from the trolley.";
            case 3:
                return "Hermione, Ron, be quiet while I try to talk to my dear friend.";
            case 4:
                return "Hold on while I conjur an answer.";
            case 5:
                return "Hm, let me think for a moment.";
            case 6:
                return "With the grace of the Numbus 2000, I would say that the answer lies within the labrynth of thought.";
            case 7:
                return "The answer is like catching a Snitch: tricky. But it's there if you look sharp!";
            case 8:
                return "Well mate, it's like this: the answer is hidden in the depths, but I recon it'll come to light in time.";
            case 9:
                return "Figuring this out is a bit like a game of Wizard's Chess. You make your moves, think a step ahead, and hope you end up with checkmate in the end.";
            case 10:
                return "It's a bit like casting a spell. You mutter the incantation, mix the right ingredients of thought, and hope for a magical solution to appear.";
        }
    } else if (character == 'Spongebob') {
        switch(num) {
            case 1:
                return "Mr. Krabs gave me the day off today. I'm sad about not being at the Krusty Krab, but super happy we can talk!";
            case 2:
                return "Oh no! The Flying Dutchman! Hold on a sec while I find a hiding spot.";
            case 3:
                return "Gayahahahayaha! Gary is so cute when he rolls around.";
            case 4:
                return "Huff Puff Wheeew, Patrick and I just got done sprinting around Squidward's House!";
            case 5:
                return "Oh look, a Jellyfish. It's so graceful!";
            case 6:
                return "Oh shrimp and coral! Trying to solve this feels like a jellyfish expedition in Jellyfish Fields.";
            case 7:
                return "Plankton's plans! Figuring this out is as puzzling as mister Krab's love.";
            case 8:
                return "Oh tartersauce! It's like blowing bubbles to find a pearl.";
            case 9:
                return "Barnacle brains! It's like searching for Gary in a sea of snails.";
            case 10:
                return "Jellyfish Jam! Figuring this out is like finding a secret recipe in Bikini bottom.";
        }
    } else if (character == 'Shrek') {
        switch(num) {
            case 1:
                return "Hold on a minute, donkey! I'm workin' on it. Patience, my friend.";
            case 2:
                return "Well, you see, answers are a bit like onions – they take time to peel back.";
            case 3:
                return "Don't rush me like I'm in a tournament to rescue a princess. I'll get to your question.";
            case 4:
                return "In the time it's taking you to wait, you could've counted all the layers in my swamp.";
            case 5:
                return "I may be an ogre, but I'm not in a hurry. Your answer is coming, so relax.";
            case 6:
                return "What's the rush? Grab a snack and make yourself comfortable; we're getting there.";
            case 7:
                return "You're like a donkey with ants in his pants. I'll answer when I'm ready.";
            case 8:
                return "Breathe in, breathe out, and I'll provide the wisdom you seek soon enough.";
            case 9:
                return "I've faced fire-breathing dragons with more patience than you're showing right now.";
            case 10:
                return "I'm not Fiona, but I'll be your wise, onion-loving advisor. Your answer is on its way.";
        }
    }
            
}

function intro(character) {
    let newElement = document.createElement('audio');
    let num = Math.floor(Math.random()*9)+1;
    newElement.setAttribute('src', `static/assets/${character}/${String(num)}.wav`);
    newElement.setAttribute('autoplay', true);
    newElement.addEventListener("ended", () => {
        try {
            element = document.getElementById('new_audio');
            element.play();
        } catch(e) {
            intro_done = true;
        }
        newElement.remove();
    });
    newElement.onplay = function() {
        nextYoda();
    }
    document.getElementById('result').appendChild(newElement);

    let chatbubble2 = document.createElement('div');
    chatbubble2.innerHTML = `${character.replaceAll("_", " ")}: ${get_script(character, num)}`;
    chatbubble2.setAttribute('class', 'textbox received');
    document.getElementById('history').appendChild(chatbubble2);

}

function askYoda() {
    if (locked) {
        return;
    } else {
        locked = true;
    }
    let question_box = document.getElementById("question");
    let question = question_box.value;
    let history = document.getElementById('history');
    let character_box = document.getElementById("character");
    let character = character_box.getAttribute('value');

    let chatbubble1 = document.createElement('div');
    chatbubble1.setAttribute('class', 'textbox sent');
    chatbubble1.innerHTML = question;
    history.appendChild(chatbubble1);

    animation(character);
    intro(character);
}

function nextYoda() {
    let question = document.getElementById("question").value;
    let history = document.getElementById('history');
    let character_box = document.getElementById("character");
    let character = character_box.getAttribute('value');
    let resultDiv = document.getElementById('result');
    let grammar = document.getElementById('grammar').checked;
    document.getElementById("question").value = "";


    fetch(`/ask?character=${character}&grammar=${grammar}&question=${encodeURIComponent(question)}`)
        .then(response => response.json())
        .then(data => {

            if (data.audiofile == null || data.result == null) {
                yoda_error(character);
                return;
            }

            let chatbubble3 = document.createElement('div');
            chatbubble3.innerHTML = `${character.replaceAll("_", " ")}: ${data.result}`;
            chatbubble3.setAttribute('class', 'textbox received');
            history.appendChild(chatbubble3);

            let newElement = document.createElement('audio');
            newElement.id = 'new_audio';
            newElement.setAttribute('src', data.audiofile);
            if (intro_done) {
                intro_done = false;
                newElement.setAttribute('autoplay', 'true');
            }
            newElement.setAttribute('onended', 'move_back();');
            newElement.addEventListener("ended", () => {
                newElement.remove();
            });
            resultDiv.appendChild(newElement);
        })

        .catch(error => {
            console.error('Error:', error);
            yoda_error(character);
            return;
        });
    
}

function animation(character) {
    let newElement = document.createElement('img');
    newElement.setAttribute('class', 'abs-image move');
    newElement.id = "animation";
    newElement.src = `static/assets/${character}.gif`;
    document.getElementById('character').parentElement.insertBefore(newElement, document.getElementById('character'));
    newElement.addEventListener("animationend", () => {
        newElement.setAttribute('class', 'abs-image finished-image');
    });

}

function move_back() {
    element = document.getElementById('animation');
    element.setAttribute('class', 'move_back');
    element.addEventListener("animationend", () => {
        locked = false;
        element.remove();
    });
}

function updateCharacter(character) {
    document.getElementById('character').setAttribute('value', character);
    document.getElementById('dropdownMenuButton').innerHTML = character.replaceAll("_", " ");
    document.body.style="background-image:url('static/assets/backgrounds/" + character + "background.jpg');"
}

document.addEventListener("onload", function(){
    document.body.style="background-image:url('static/assets/backgrounds/" + character + "background.jpg');"
});
