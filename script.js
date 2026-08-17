

// Sequence which types out lines on the hero terminal on boot

function runBootSequence() {
    const bootElement = document.getElementById("bootLines")
    const lines = [
        "intializing session...",
        "loading profile: sanjay.vasu",
        "status: ready"
    ]

    let lineIndex = 0;
    let charIndex = 0;
    let text = "";

    function typeNextChar() {
        if (lineIndex >= lines.length) return;

        const currentLine = lines[lineIndex];

        if (charIndex < currentLine.length) {
            text += currentLine[charIndex];
            bootElement.textContent = text;
            charIndex++;
            setTimeout(typeNextChar, 20);
        } else {
            text += "\n";
            bootElement.textContent = text;
            lineIndex++;
            charIndex = 0;
            setTimeout(typeNextChar, 250);
        }
    }

    typeNextChar();
}

// Interactive prompt on the terminal bottom

function setupTerminalPrompt() {
    const input = document.getElementById("terminalInput");
    const output = document.getElementById("promptOutput");

    const commands = {
        help: () =>
            "available commands: about, projects, awards, experience, contact, help",
        about: () => navigateTo("#about", "opening about section..."),
        projects: () => navigateTo("#projects", "opening projects section..."),
        awards: () => navigateTo("#awards", "opening awards section..."),
        experience: () => navigateTo("#experience", "opening experience section..."),
        contact: () => navigateTo("#contact", "opening contact section..."),
    };

    function navigateTo(id, message) {
        const target = document.querySelector(id);
        if (target) target.scrollIntoView( {behavior: "smooth"} );
        return message;
    }

    input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;

        const rawCommand = input.value.trim().toLowerCase();
        input.value = "";

        if (!rawCommand) return;

        const handler = commands[rawCommand];
        const response = handler
            ? handler()
            : `command not found: ${rawCommand} - try "help"`;

        output.innerHTML = `<strong>$</strong> ${escapeHtml(rawCommand)}<br>${escapeHtml(response)}`;
    });
}

//to make sure anything user types is plaintext NOT html
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}