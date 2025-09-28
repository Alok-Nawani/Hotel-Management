const fs = require('fs');
const path = require('path');

function ensureOutputDir() {
  const outDir = path.join(__dirname, '..', 'data_tables');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  return outDir;
}

function mapModelToFilename(modelName) {
  const map = {
    User: 'authenticate',
    Staff: 'staff',
    MenuItem: 'menu',
    Customer: 'customers',
    Order: 'orders',
    OrderItem: 'order_items',
    Inventory: 'inventory',
    Payment: 'payments',
    Review: 'reviews'
  };
  return map[modelName] || modelName.toLowerCase();
}

function toMarkdownTable(rows) {
  if (!rows || rows.length === 0) {
    return 'No data.';
  }
  const columns = Object.keys(rows[0]);
  const header = `| ${columns.join(' | ')} |`;
  const sep = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = rows.map(r => `| ${columns.map(k => formatCell(r[k])).join(' | ')} |`).join('\n');
  return `${header}\n${sep}\n${body}`;
}

function formatCell(value) {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') return '`' + JSON.stringify(value) + '`';
  return String(value).replace(/\n/g, ' ').slice(0, 500);
}

async function exportModelToMarkdown(model, filename) {
  const outDir = ensureOutputDir();
  const filePath = path.join(outDir, `${filename}.md`);
  const rows = await model.findAll({ raw: true });
  const content = `# ${filename}\n\n${toMarkdownTable(rows)}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

async function exportAllTables(modelsRegistry) {
  const modelEntries = Object.entries(modelsRegistry).filter(([key]) => key[0] === key[0].toUpperCase());
  for (const [name, model] of modelEntries) {
    const filename = mapModelToFilename(name);
    try {
      await exportModelToMarkdown(model, filename);
    } catch (err) {
      // Best-effort: do not crash the app on export failure
      // eslint-disable-next-line no-console
      console.error(`[tableExporter] Failed to export ${name}:`, err.message);
    }
  }
}

function attachExportHooks(modelsRegistry) {
  const modelEntries = Object.entries(modelsRegistry).filter(([key]) => key[0] === key[0].toUpperCase());
  for (const [name, model] of modelEntries) {
    const filename = mapModelToFilename(name);
    const trigger = async () => {
      try {
        await exportModelToMarkdown(model, filename);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`[tableExporter] Hook export failed for ${name}:`, err.message);
      }
    };
    model.addHook('afterCreate', trigger);
    model.addHook('afterUpdate', trigger);
    model.addHook('afterDestroy', trigger);
  }
}

module.exports = { exportAllTables, attachExportHooks };


