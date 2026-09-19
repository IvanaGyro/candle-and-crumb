import base64,json
from pathlib import Path
root=Path(__file__).resolve().parent
html=(root/'src/template.html').read_text(encoding='utf-8')
for token,value in {
    '__CORE__':(root/'src/daily-core.js').read_text(encoding='utf-8'),
    '__POINTS__':json.dumps(json.loads((root/'src/points.json').read_text(encoding='utf-8')),ensure_ascii=False),
    '__IMAGE__':'data:image/jpeg;base64,'+base64.b64encode((root/'assets/cafe-map.jpg').read_bytes()).decode()
}.items():html=html.replace(token,value)
(root/'index.html').write_text(html,encoding='utf-8')
print('Built index.html')
