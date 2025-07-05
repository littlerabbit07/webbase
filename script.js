document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("crt-intro");
  const main = document.getElementById("main-content");
  const typingText = document.getElementById("typing-text");
  const crtAudio = document.getElementById("crt-audio");
  const form = document.getElementById("contactForm");
  const message = document.getElementById("form-message");
  const terminalInput = document.getElementById("terminalCommand");
  const output = document.getElementById("command-output");

  const text = "Welcome to the CRT Terminal";
  let index = 0;

  function type() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  intro.addEventListener("animationend", () => {
    intro.style.display = "none";
    crtAudio.play(); // Play CRT boot sound
    main.classList.remove("hidden");
    type();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "✅ Thank you! Message received.";
    form.reset();
  });

  // Handle fake terminal commands
  terminalInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = terminalInput.value.trim().toLowerCase();
      let response = "";

      switch (command) {
        case "help":
          response = "Available commands:\nhelp\nabout\nclear";
          break;
        case "about":
          response = "This is a retro CRT terminal website built with ❤️.";
          break;
        case "clear":
          output.textContent = "";
          terminalInput.value = "";
          return;
        default:
          response = `Unknown command: ${command}`;
      }

      output.textContent += `> ${command}\n${response}\n`;
      terminalInput.value = "";
    }
  });

  // Play CRT sound on header link click
  const headerLinks = document.querySelectorAll("header a, .header a");
  headerLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Restart audio if already playing
      crtAudio.currentTime = 0;
      crtAudio.play();
    });
  });

  // Ensure audio can play on first user interaction (for browsers that block autoplay)
  function unlockAudio() {
    crtAudio.play().catch(() => {});
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  }
  window.addEventListener('click', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
});
