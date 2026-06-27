const $ = id => document.getElementById(id),
      res = $("result"),
      hist = $("history");

let history = JSON.parse(localStorage.getItem("history") || "[]");

const render = () => {
    hist.innerHTML = "";

    history = history.slice(-20);

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        hist.prepend(li);
    });

    localStorage.setItem("history", JSON.stringify(history));
};

render();

function nums() {
    return [
        Number($("num1").value),
        Number($("num2").value)
    ];
}

document.querySelectorAll("[data-op]").forEach(button => {
    button.onclick = () => calc(button.dataset.op);
});

function addHist(text) {
    history.push(text);
    render();
}

function calc(op) {
    let [a, b] = nums();

    if (Number.isNaN(a) || Number.isNaN(b)) {
        res.textContent = "Enter both numbers";
        return;
    }

    let r;

    switch (op) {
        case "+":
            r = a + b;
            break;

        case "-":
            r = a - b;
            break;

        case "*":
            r = a * b;
            break;

        case "/":
            if (b === 0) {
                res.textContent = "Cannot divide by zero";
                return;
            }
            r = a / b;
            break;

        case "%":
            r = a % b;
            break;
    }

    res.textContent = "Result: " + r;
    addHist(`${a} ${op} ${b} = ${r}`);
}

$("square").onclick = () => {
    let [a] = nums();
    let r = a * a;

    res.textContent = "Result: " + r;
    addHist(`${a}² = ${r}`);
};

$("sqrt").onclick = () => {
    let [a] = nums();

    if (a < 0) {
        res.textContent = "Invalid";
        return;
    }

    let r = Math.sqrt(a);

    res.textContent = "Result: " + r;
    addHist(`√${a} = ${r}`);
};

$("clear").onclick = () => {
    $("num1").value = "";
    $("num2").value = "";
    res.textContent = "Result: 0";
};

$("copy").onclick = () => {
    navigator.clipboard.writeText(res.textContent);
};

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        calc("+");
    }
});

const dark = localStorage.getItem("theme") === "dark";

if (dark) {
    document.body.classList.add("dark");
}

$("themeBtn").onclick = () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
};

$("clearHistory").onclick = () => {
    history = [];
    localStorage.removeItem("history");
    render();
};