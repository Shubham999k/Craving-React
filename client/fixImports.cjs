const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    const fullPath = path.join('src', filePath);
    if (!fs.existsSync(fullPath)) return;
    let content = fs.readFileSync(fullPath, 'utf8');
    replacements.forEach(({from, to}) => {
        content = content.replace(from, to);
    });
    fs.writeFileSync(fullPath, content);
}

replaceInFile('pages/OrderPage.jsx', [
    { from: /import \{ FOOD_ITEMS \} from '\.\/dashboard\/UserDashboard';/g, to: "import { FOOD_ITEMS } from '../data/mockData';" }
]);

replaceInFile('pages/RestaurantDetails.jsx', [
    { from: /import \{ FOOD_ITEMS \} from '\.\/dashboard\/UserDashboard';/g, to: "import { FOOD_ITEMS } from '../data/mockData';" }
]);

replaceInFile('pages/dashboard/components/OverviewTab.jsx', [
    { from: /import \{ FOOD_ITEMS \} from '\.\.\/UserDashboard';/g, to: "import { FOOD_ITEMS } from '../../../data/mockData';" }
]);

replaceInFile('pages/dashboard/components/MenuTab.jsx', [
    { from: /import \{ FOOD_ITEMS \} from '\.\.\/UserDashboard';/g, to: "import { FOOD_ITEMS } from '../../../data/mockData';" }
]);

replaceInFile('pages/dashboard/components/ProfileTab.jsx', [
    { from: /import \{ PRESET_AVATARS \} from '\.\.\/UserDashboard';/g, to: "import { PRESET_AVATARS } from '../../../data/mockData';" }
]);

console.log('Imports replaced.');
