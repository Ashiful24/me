import fs from "node:fs";
import path from "node:path";

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.startsWith("create-") && entry.name.endsWith(".dto.ts")) {
      acc.push(full);
    }
  }
  return acc;
}

for (const file of walk("src")) {
  const source = fs.readFileSync(file, "utf8");
  const body = source.split("export class")[1] || "";
  const need = {
    IsArray: /@IsArray\(/.test(body),
    IsEnum: /@IsEnum\(/.test(body),
    IsInt: /@IsInt\(/.test(body),
    IsNotEmpty: /@IsNotEmpty\(/.test(body),
    IsOptional: /@IsOptional\(/.test(body),
    IsString: /@IsString\(/.test(body),
    Type: /@Type\(/.test(body),
  };

  const validators = Object.keys(need).filter((key) => key !== "Type" && need[key]);
  let imports = "";
  if (validators.length) {
    imports += `import { ${validators.join(", ")} } from 'class-validator';\n`;
  }
  if (need.Type) {
    imports += `import { Type } from 'class-transformer';\n`;
  }

  const enumMatch = source.match(/import \{[^}]+\} from '@prisma\/client';/);
  if (enumMatch) {
    imports += `${enumMatch[0]}\n`;
  }

  const rest = source.replace(/^import[\s\S]*?export class/m, "export class");
  fs.writeFileSync(file, `${imports}\n${rest}`);
  console.log(`fixed ${file}`);
}
