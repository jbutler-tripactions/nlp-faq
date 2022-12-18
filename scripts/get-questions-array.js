const faqs = require('../current-faqs.json')
const fs = require('fs');

fs.writeFileSync('./output/raw-question-array.json', JSON.stringify(faqs.map(faq => faq.title)))
