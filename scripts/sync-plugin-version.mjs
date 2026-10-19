import { readFile, writeFile } from "node:fs/promises";

const pluginManifestPath = new URL(
  "../.claude-plugin/plugin.json",
  import.meta.url,
);
const packageJsonPath = new URL("../package.json", import.meta.url);

const packageVersion = JSON.parse(
  await readFile(packageJsonPath, "utf8"),
).version;
const version = process.argv[2] ?? packageVersion;

if (version !== packageVersion) {
  console.error(
    `Version mismatch: expected ${version} but package.json is at ${packageVersion}`,
  );
  process.exit(1);
}

const manifest = JSON.parse(await readFile(pluginManifestPath, "utf8"));

if (manifest.version === version) {
  console.log(`plugin.json already at ${version}`);
} else {
  console.log(`plugin.json: ${manifest.version} -> ${version}`);
  manifest.version = version;
  await writeFile(pluginManifestPath, JSON.stringify(manifest, null, 2) + "\n");
}
