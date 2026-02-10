document.addEventListener("DOMContentLoaded", () => {
    const layer = document.querySelector(".parallax-layer");
    window.content = document.getElementById("content");
    const whisper = document.querySelector(".whisper");

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    /* Parallax */

    if (layer && finePointer) {
        let idleTimeout;

        window.addEventListener("mousemove", (e) => {
        clearTimeout(idleTimeout);

        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;

        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        idleTimeout = setTimeout(() => {
            layer.style.transform = "translate3d(0, 0, 0)";
        }, 800);
        });
    }

    /* Whisper */

    if (whisper) {
        const whispers = [
        "absence is a choice",
        "nothing accidental",
        "form follows intent",
        "precision over noise",
        "clarity is discipline",
        "simplicity is not ease",
        "restraint is a skill",
        "silence has structure",
        "designed, not decorated",
        "nothing here is casual",
        "built to endure",
        "systems before style",
        "structure creates freedom",
        "tools should disappear",
        "performance is respect",
        "engineering is empathy",
        "code is a promise",
        "nothing clever without reason",
        "if it’s slow, it’s wrong",
        "elegance is measurable",
        "this took longer than it shows",
        "unfinished is unacceptable",
        "subtlety takes work",
        "I notice what others ignore",
        "every detail matters",
        "intentional down to the bone",
        "polish is invisible",
        "rough edges are choices",
        "nothing ships by accident",
        "I will refine this again",
        "meaning is made, not found",
        "inaction is still a decision",
        "nothing owes me anything",
        "I choose anyway",
        "the universe does not care",
        "existing is not enough",
        "time is not forgiving",
        "passivity is decay",
        "purpose is practiced",
        "attention creates value",
        "I will not waste this mind",
        "mediocrity is loud",
        "I refuse to rush meaning",
        "I build despite uncertainty",
        "comfort is not the goal",
        "I am not here to coast",
        "this matters to me",
        "I do not compromise lightly",
        "I expect more of myself",
        "quiet confidence",
        "measured, not hesitant",
        "I know what I’m doing",
        "this is intentional",
        "I trust my judgment",
        "decisions were made",
        "I stand by this",
        "no explanation required",
        "you weren’t supposed to notice this",
        "this page is paying attention",
        "someone cared",
        "there is thought here",
        "this is not empty",
        "you are being observed by design",
        "the silence is deliberate",
        "something is happening",
        "this is not a template",
        "stay a moment"
        ];

        const choice =
        whispers[Math.floor(Math.random() * whispers.length)];

        whisper.textContent = choice;
    }

    /* Mouse Trail */

    if (finePointer) {
        let lastTime = 0;

        window.addEventListener("mousemove", (e) => {
        const now = performance.now();
        if (now - lastTime < 40) return;
        lastTime = now;

        const dot = document.createElement("div");
        dot.className = "trail-dot";

        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;

        document.body.appendChild(dot);

        setTimeout(() => {
            dot.remove();
        }, 1800);
        });
    }

    /* Page Navigation */
    document.querySelectorAll("[data-route]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const route = link.dataset.route;
            loadPage(route);
        });
    });

    window.addEventListener("popstate", (e) => {
        const route = e.state?.route || "home";
        loadPage(route);
    });

    /* Page Inital */
    const initialRoute = location.pathname.split("/")[1] || "home";
    loadPage(initialRoute);
});

async function loadPage(route) {
    // Fade out
    content.style.opacity = 0;

    await new Promise(r => setTimeout(r, 300));

    if (route === "blog") {
        loadBlogIndex();
        return;
    }

    const res = await fetch(`/pages/${route}.html`, { cache: "no-store" });
    const html = await res.text();

    content.innerHTML = html;

    // Fade in
    requestAnimationFrame(() => {
        content.style.opacity = 1;
    });
}