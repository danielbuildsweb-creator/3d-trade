import fs from 'fs';

let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');
content = content.replace(/<a href="#pricing"/g, '<a href="#pricing" onClick={(e) => { e.preventDefault(); document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}');
content = content.replace(/<a href="#markets"/g, '<a href="#markets" onClick={(e) => { e.preventDefault(); document.getElementById("markets")?.scrollIntoView({ behavior: "smooth" }); }}');
fs.writeFileSync('src/components/Hero.tsx', content);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
// adjust ticker tape to have max-width or let it overflow hidden properly
// It's already fine.
fs.writeFileSync('src/App.tsx', appContent);

