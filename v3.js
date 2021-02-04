// Constant Variables
const CHANNEL_NAME = 'therepkats';
const BOT_USERNAME = 'moqlnkn_v3';
const BAD_WORDS = [
    'asdfasdfasdf',
];

// ~~~~~~~~~~~~~~~~~~~~~~~~

const tmi = require('tmi.js');

const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: BOT_USERNAME,
        password: 'oauth:ewb82iivtjy7qqi9mc5olq5jrvtvlk',
        // Twitch: moqlnkn_v3, the_best_bot
    },
    channels: [CHANNEL_NAME],
};

const client = new tmi.client(options);

client.connect();

// ~~~~~~~~~~~~~~~~~~~~~~~~








// Things to do on startup.
client.on('connected', (address, port) => {
    client.say(CHANNEL_NAME, 'GOOOOD MORNING, beautiful ladies and gentlemen');
});


// Things to do for each chat message.
client.on('chat', (channel, user, message, self) => {

    // Ignore messages from myself
    if (user['display-name'] === 'moqlnkn_v3') return;

    // Ignore messages with banned words
    if (hasBadWords(message)) {
        deleteMessage(user, channel, true);
        client.say(channel, `@${user.username}, your message contained a naughty naughty!`);
        return;
    }

    // Only me
    if (user['display-name'] === 'Moqlnkn') {
        switch (message.toLowerCase()) {
            case '!breakdance': {
                client.action(channel, 'tapdances instead');
            } break;
            case '!phrase': {
                client.say(channel,
                    GetRandom(
                        ['I like trains.', 'SHAUN. SHAUN. SHAUN!']
                    )
                );
            } break;;
        }

        if (message.toLowerCase().includes('v3')) {
            if (message.toLowerCase().includes('what do you think about')){
                if (message.toLowerCase().includes('me')) {
                    client.say(channel, GetRandom([
                    'You are quite upstanding and handsome, young sir.',
                    'There is no man on this earth quite like yourself, sir.',
                    'Quite literally the best fighting game player in this universe!']));
                }
                if (message.toLowerCase().includes('tae')) {
                    client.say(channel, GetRandom([
                        'Err, well-- you see-- she-- but the thing is-- about that-- *resets* What was that? I blacked out.',
                        'T-Tae!? I think you mean Me- *resets* Huh!? I\'ve forgotten what I was doing.',
                        'I- I have no comment on the matter!!!'
                    ]));
                }
                if (message.toLowerCase().includes('garrett')) {
                    client.say(channel, GetRandom([
                        'Garrett is most humorous... although... not very good at video games, I must say.',
                        'He knows how to program! ... sort of... not very creative, though.',
                        'He always hates the games you send him!!!'
                    ]));
                }
            }
        }
    }

    // Only everyone else
    else {

    }

    // Everyone

    // Specific messages
    switch (message.toLowerCase()) {
        case '!whoami': {
            client.say(channel, `...${user.username}... is not whom'st they claimest to be-est...`);
        } break;
        case '!arnold': {
            client.say(channel, GetRandom([
                'HURRRRRYYY! GET TO THE AIRPLANE!',
                'PUT THAT SAUSAGE DOWN! NOW!',
                'YOU GOT WHAT YOU WANT, NOT GET THIS PEEPLE AIR',
                'YOU SON OF A BICH *beefy hand slap*',
                'AAAAAAAAAUUUUURGH!',
                'AaAaaUUuuug..~',
                'I\'ll be bock.'
            ]));
        } break;
        case '!punmedaddy': {
            client.say(channel, GetRandom([
                ''
            ]));
        } break;
    }

    // Contained phrases
});

// Check if the message has bad words
function hasBadWords(message) {
    return BAD_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()));
}

// Call this to delete a message
function deleteMessage(user, channel, printerr) {
    client.deletemessage(channel, user.id).then((data) => {
        
    }).catch((err) => {
        if (printerr) client.say(channel, 'AN ERROR!? ' + err);
    });
}

// Print a random string from a given array
function GetRandom(strs) {
    return strs[Math.floor(Math.random() * strs.length)];
}
