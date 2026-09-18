document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatBox = document.getElementById('chatBox');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    chatToggle?.addEventListener('click', () => {
        chatBox.classList.toggle('hidden');
    });

    chatClose?.addEventListener('click', () => {
        chatBox.classList.add('hidden');
    });

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const appendMessage = (sender, text) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return msgDiv;
    };

    const showLoadingIndicator = () => {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('chat-msg', 'bot', 'typing-indicator');
        loadingDiv.id = 'loadingIndicator';
        loadingDiv.textContent = "Typing...";
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return loadingDiv;
    };

    const removeLoadingIndicator = () => {
        const loadingDiv = document.getElementById('loadingIndicator');
        if (loadingDiv) loadingDiv.remove();
    };

    const getBotAnswer = (query) => {
        const text = query.toLowerCase();

        if (text.includes('birthday') || text.includes('birth') || text.includes('born') || text.includes('age') || text.includes('old')) {
            return getRandom([
                "Neian was born on April 15, 2004, which makes them 22 years old.",
                "Neian is 22 years old, born on April 15, 2004.",
                "April 15, 2004! Neian is currently 22 years old."
            ]);
        }

        if (text.includes('location') || text.includes('live') || text.includes('address') || text.includes('cabuyao') || text.includes('laguna') || text.includes('where')) {
            return getRandom([
                "Neian is based in Cabuyao, Laguna, Philippines.",
                "Neian lives over in Cabuyao, Laguna, Philippines.",
                "You can find Neian in Cabuyao, Laguna, Philippines."
            ]);
        }

        if (text.includes('canescan') || text.includes('tomascan')) {
            return getRandom([
                "CaneScan and TomaScan are Android apps built using Kotlin, Android Studio, TensorFlow Lite, and the Open-Meteo API to detect plant diseases and suggest treatment recommendations.",
                "Those are smart agricultural apps! CaneScan and TomaScan leverage TensorFlow Lite and Kotlin to diagnose plant diseases and provide treatment guidelines."
            ]);
        }

        if (text.includes('pizzeria')) {
            return "Pizzeria is a full-stack online ordering system built using PHP, MySQL, HTML, CSS, Bootstrap, and JavaScript.";
        }

        if (text.includes('manoysneaks')) {
            return "ManoySneaks is a Footwear Management System crafted with Python, HTML, CSS, and SQLite to manage inventory and sales.";
        }

        if ((text.includes('one') || text.includes('single') || text.includes('example')) && (text.includes('project') || text.includes('app') || text.includes('system') || text.includes('work'))) {
            const singleProjects = [
                "One great example is **CaneScan**, an Android app built with Kotlin and TensorFlow Lite to detect sugarcane leaf diseases.",
                "An example of his work is **Pizzeria**, a full-stack online ordering system built using PHP, MySQL, and Bootstrap.",
                "Here's one: **ManoySneaks**, a Footwear Management System built with Python and SQLite to handle inventory and sales.",
                "One project he built is **TomaScan**, an Android application that uses AI models to identify tomato plant diseases."
            ];
            return getRandom(singleProjects);
        }

        if (text.includes('project') || text.includes('app') || text.includes('system') || text.includes('build') || text.includes('work')) {
            return getRandom([
                "Neian has built quite a few projects! Some highlights include CaneScan, TomaScan, Pizzeria, ManoySneaks, Jade Hotel's, Marvel Gallery, Naruto Gallery, and a Taal Volcano Showcase.",
                "Neian has a diverse portfolio including CaneScan, TomaScan, Pizzeria, ManoySneaks, Jade Hotel's, and several interactive web showcases!"
            ]);
        }

        if (text.includes('education') || text.includes('school') || text.includes('college') || text.includes('degree') || text.includes('study')) {
            return getRandom([
                "Neian is currently pursuing a BSIT degree at PUP Sto. Tomas Campus (2023–Present). Before that, Neian graduated with honors in STEM at Saint Benilde International School!",
                "Neian studies Information Technology at PUP Sto. Tomas Campus. They also finished Senior High (STEM) and Junior High with honors at Saint Benilde International School.",
                "Currently, Neian is a BSIT student at PUP Sto. Tomas. They also have a strong academic foundation from Saint Benilde International School."
            ]);
        }

        if (text.includes('skills') || text.includes('stack') || text.includes('language') || text.includes('tool')) {
            return "Here's a breakdown of Neian's technical skills:\n" +
                "• Frontend: HTML, CSS, JavaScript, Bootstrap\n" +
                "• Backend: Java, PHP, Python, MySQL, REST APIs\n" +
                "• Tools: Git, GitHub, VS Code, Android Studio, Figma, Firebase.";
        }

        if (text.includes('certif') || text.includes('license')) {
            return getRandom([
                "Neian holds certifications in Java Essentials (1 & 2), Microsoft Cybersecurity, and Operating Systems.",
                "So far, Neian has earned certifications for Java Essentials (1 & 2), Microsoft Cybersecurity, and Operating Systems."
            ]);
        }

        if (text.includes('contact') || text.includes('email') || text.includes('reach') || text.includes('github') || text.includes('linkedin')) {
            return "You can get in touch with Neian via:\n" +
                "• Email: neianaustria07@gmail.com\n" +
                "• GitHub: https://github.com/njaustria\n" +
                "• LinkedIn: https://www.linkedin.com/in/njaustria";
        }

        if (text.includes('who') || text.includes('about') || text.includes('neian') || text.includes('name')) {
            return getRandom([
                "Neian Austria is a 4th-year BSIT student at Polytechnic University of the Philippines – Sto. Tomas Campus, aiming to become a Full-Stack Developer!",
                "That's Neian Austria! A passionate BSIT student at PUP Sto. Tomas Campus focusing on full-stack development and mobile tech.",
                "Neian is an aspiring Full-Stack Developer currently in their 4th year studying BSIT at PUP Sto. Tomas."
            ]);
        }

        if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('sup')) {
            return getRandom([
                "Hey there! What would you like to know about Neian?",
                "Hello! Feel free to ask me anything about Neian's projects, skills, or background.",
                "Hi! How can I help you learn more about Neian today?",
                "Hey! Ask away—I can fill you in on Neian's tech stack, projects, and more."
            ]);
        }

        return getRandom([
            "Hmm, I'm not quite sure about that one! I can mostly answer questions regarding Neian's skills, projects, education, or experience. Try asking 'What projects has Neian built?'",
            "I might not have the answer to that. Feel free to ask about Neian's tech stack, certifications, or background!",
            "I'm specifically tuned to chat about Neian Austria. Try asking about Neian's education, background, or favorite technologies!"
        ]);
    };

    chatForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatInput.value.trim();
        if (!userText) return;

        appendMessage('user', userText);
        chatInput.value = '';

        showLoadingIndicator();

        setTimeout(() => {
            removeLoadingIndicator();
            const botReply = getBotAnswer(userText);
            appendMessage('bot', botReply);
        }, 3000);
    });
});