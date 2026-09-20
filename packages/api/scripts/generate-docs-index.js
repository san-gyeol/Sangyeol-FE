#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/references/api');

// Generate main API index
const categories = fs.readdirSync(docsDir).filter(item => {
  const fullPath = path.join(docsDir, item);
  return fs.statSync(fullPath).isDirectory();
});

const mainIndexContent = `# API Reference

프로젝트의 모든 API 문서입니다.

## 카테고리

### 기능별 API

${categories.filter(c => !['Constants', 'Types'].includes(c)).map(cat =>
  `- [${cat}](./${cat}/) - ${getCategoryDescription(cat)}`
).join('\n')}

### 공통

${categories.filter(c => ['Constants', 'Types'].includes(c)).map(cat =>
  `- [${cat}](./${cat}/) - ${getCategoryDescription(cat)}`
).join('\n')}
`;

fs.writeFileSync(path.join(docsDir, 'index.md'), mainIndexContent);
console.log('✓ Created API index.md');

// Generate category indexes
categories.forEach(category => {
  const categoryDir = path.join(docsDir, category);
  const files = fs.readdirSync(categoryDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => file.replace('.md', ''));

  const categoryIndexContent = `# ${category}

## API 목록

${files.map(name => `- [${name}](./${name}.md)`).join('\n')}
`;

  fs.writeFileSync(path.join(categoryDir, 'index.md'), categoryIndexContent);
  console.log(`✓ Created ${category}/index.md (${files.length} items)`);
});

function getCategoryDescription(category) {
  const descriptions = {
    'Auth': '인증 관련 API',
    'OAuth': '소셜 로그인 API',
    'Users': '사용자 관련 API',
    'Mountains': '산/코스 관련 API',
    'Bases': '베이스 관련 API',
    'Travel': '산행 기록 관련 API',
    'Bookmarks': '북마크 관련 API',
    'Facilities': '편의시설 관련 API',
    'Pathways': '등산로 경로 관련 API',
    'Controls': '실시간 통제정보 API',
    'Weather': '날씨 API',
    'Constants': 'API 경로 상수',
    'Types': '타입 정의'
  };
  return descriptions[category] || `${category} API`;
}

console.log('\n✨ Documentation index generation complete!');
