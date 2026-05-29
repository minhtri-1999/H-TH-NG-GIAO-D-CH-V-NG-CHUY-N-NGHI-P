import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import { createElement } from "https://esm.sh/react@18.2.0";
import App from "./App.tsx";
import { CSS } from "./styles.ts";

// Inject styles
const style = document.createElement("style");
style.textContent = CSS;
document.head.appendChild(style);

// Mount React app
const root = createRoot(document.getElementById("root"));
root.render(createElement(App));
