import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const EXPECTED_ORIGIN = "https://muhammed-mubashir-portfolio.netlify.app"
const EXPECTED_HOME = `${EXPECTED_ORIGIN}/`
const EXPECTED_RESUMES = new Set([
  "muhammed-mubashir-k-resume-flutter.pdf",
  "muhammed-mubashir-k-resume-flutter.docx",
])
const SOURCE_EXTENSIONS = new Set([".css", ".html", ".js", ".jsx", ".json", ".ts", ".tsx"])

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const rootDirectory = path.resolve(scriptDirectory, "..")
const publicDirectory = path.join(rootDirectory, "public")
const sourceDirectory = path.join(rootDirectory, "src")
const failures = []

function fail(message) {
  failures.push(message)
}

function readRequired(relativePath) {
  const absolutePath = path.join(rootDirectory, relativePath)

  if (!existsSync(absolutePath)) {
    fail(`${relativePath} is missing`)
    return ""
  }

  return readFileSync(absolutePath, "utf8")
}

function walkFiles(directory) {
  if (!existsSync(directory)) return []

  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = path.join(directory, entry.name)
    return entry.isDirectory() ? walkFiles(absolutePath) : [absolutePath]
  })
}

function relativeFromRoot(absolutePath) {
  return path.relative(rootDirectory, absolutePath).split(path.sep).join("/")
}

function parseAttributes(tag) {
  const attributes = {}
  const attributePattern = /\b([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

  for (const match of tag.matchAll(attributePattern)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? ""
  }

  return attributes
}

function tagsNamed(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(match => ({
    raw: match[0],
    attributes: parseAttributes(match[0]),
  }))
}

function metaContent(html, attributeName, value) {
  const match = tagsNamed(html, "meta").find(tag =>
    tag.attributes[attributeName]?.toLowerCase() === value.toLowerCase(),
  )
  return match?.attributes.content?.trim() ?? ""
}

function linkHref(html, rel) {
  const match = tagsNamed(html, "link").find(tag =>
    tag.attributes.rel?.toLowerCase().split(/\s+/).includes(rel.toLowerCase()),
  )
  return match?.attributes.href?.trim() ?? ""
}

function requireNonEmpty(value, message) {
  if (!value) fail(message)
}

function normalizedUrl(value) {
  try {
    return new URL(value)
  } catch {
    return null
  }
}

function validateIndexHtml(indexHtml) {
  requireNonEmpty(metaContent(indexHtml, "name", "description"), "index.html lacks a meta description")

  const canonical = linkHref(indexHtml, "canonical")
  if (canonical !== EXPECTED_HOME) {
    fail(`index.html canonical must be ${EXPECTED_HOME}`)
  }

  const requiredOpenGraph = ["og:type", "og:title", "og:description", "og:url", "og:image"]
  for (const property of requiredOpenGraph) {
    requireNonEmpty(
      metaContent(indexHtml, "property", property),
      `index.html lacks ${property} metadata`,
    )
  }

  const ogUrl = metaContent(indexHtml, "property", "og:url")
  if (ogUrl && ogUrl !== EXPECTED_HOME) {
    fail(`index.html og:url must be ${EXPECTED_HOME}`)
  }

  const requiredTwitter = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]
  for (const name of requiredTwitter) {
    requireNonEmpty(metaContent(indexHtml, "name", name), `index.html lacks ${name} metadata`)
  }

  const structuredDataScripts = [...indexHtml.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(match => parseAttributes(match[1]).type?.toLowerCase() === "application/ld+json")

  if (structuredDataScripts.length === 0) {
    fail("index.html lacks JSON-LD structured data")
  } else {
    let hasValidSchema = false

    for (const script of structuredDataScripts) {
      try {
        const value = JSON.parse(script[2])
        const items = Array.isArray(value) ? value : [value]
        hasValidSchema ||= items.some(item =>
          item && typeof item === "object" &&
          String(item["@context"] ?? "").includes("schema.org") &&
          Boolean(item["@type"]),
        )
      } catch (error) {
        fail(`index.html contains invalid JSON-LD: ${error.message}`)
      }
    }

    if (!hasValidSchema) {
      fail("index.html JSON-LD must include a schema.org @context and an @type")
    }
  }

  for (const property of ["og:image", "twitter:image"]) {
    const attributeName = property.startsWith("og:") ? "property" : "name"
    const value = metaContent(indexHtml, attributeName, property)
    const url = value ? normalizedUrl(value) : null

    if (value && (!url || url.origin !== EXPECTED_ORIGIN)) {
      fail(`${property} must use the portfolio domain ${EXPECTED_ORIGIN}`)
    }
  }

  for (const link of tagsNamed(indexHtml, "link")) {
    const rel = link.attributes.rel?.toLowerCase().split(/\s+/) ?? []
    const href = link.attributes.href ?? ""
    const as = link.attributes.as?.toLowerCase() ?? ""
    const url = normalizedUrl(href)
    const pathname = url?.pathname ?? href.split(/[?#]/, 1)[0]
    const isModelFile = /\.(?:glb|gltf)$/i.test(pathname)

    if (rel.includes("preload") && (as === "model" || isModelFile)) {
      fail(`index.html must not eagerly preload 3D model ${href}`)
    }
  }
}

function validateRobotsAndSitemap(robots, sitemap) {
  if (!/^\s*user-agent\s*:\s*\*/im.test(robots)) {
    fail("public/robots.txt must define User-agent: *")
  }
  if (!/^\s*allow\s*:\s*\/\s*$/im.test(robots)) {
    fail("public/robots.txt must allow crawling from /")
  }

  const sitemapDirective = robots.match(/^\s*sitemap\s*:\s*(\S+)\s*$/im)?.[1]
  const expectedSitemap = `${EXPECTED_ORIGIN}/sitemap.xml`
  if (sitemapDirective !== expectedSitemap) {
    fail(`public/robots.txt sitemap must be ${expectedSitemap}`)
  }

  for (const match of robots.matchAll(/https?:\/\/[^\s]+/gi)) {
    const url = normalizedUrl(match[0])
    if (!url || url.origin !== EXPECTED_ORIGIN) {
      fail(`public/robots.txt contains a URL on the wrong domain: ${match[0]}`)
    }
  }

  if (!/<urlset\b[^>]*xmlns=["']http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9["']/i.test(sitemap)) {
    fail("public/sitemap.xml lacks a valid sitemap urlset")
  }

  const locations = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map(match => match[1])
  if (locations.length === 0) {
    fail("public/sitemap.xml must contain at least one <loc>")
  }

  for (const location of locations) {
    const url = normalizedUrl(location)
    if (!url || url.origin !== EXPECTED_ORIGIN) {
      fail(`public/sitemap.xml contains a URL on the wrong domain: ${location}`)
    }
  }

  if (!locations.includes(EXPECTED_HOME)) {
    fail(`public/sitemap.xml must include ${EXPECTED_HOME}`)
  }
}

function validateHeaders(headers) {
  const requiredPatterns = [
    [/^\/\*\s*$/m, "a site-wide /* rule"],
    [/^\/\s*$/m, "a / HTML cache rule"],
    [/^\/assets\/\*\s*$/m, "an /assets/* cache rule"],
    [/x-content-type-options\s*:\s*nosniff/i, "X-Content-Type-Options: nosniff"],
    [/max-age=31536000[^\r\n]*immutable/i, "immutable caching for hashed assets"],
  ]

  for (const [pattern, description] of requiredPatterns) {
    if (!pattern.test(headers)) fail(`public/_headers lacks ${description}`)
  }
}

function publicPathnameFromReference(reference) {
  let value = reference
    .replaceAll("&amp;", "&")
    .replace(/[),.;]+$/g, "")

  if (/^https?:\/\//i.test(value)) {
    const url = normalizedUrl(value)
    if (!url || url.origin !== EXPECTED_ORIGIN) return null
    value = url.pathname
  }

  value = value.split(/[?#]/, 1)[0]

  if (
    !value.startsWith("/images/") &&
    !value.startsWith("/models/") &&
    !/(?:resume|cover-letter)[^/]*\.(?:pdf|docx)$/i.test(value)
  ) {
    return null
  }

  try {
    return value.includes("${") ? value : decodeURIComponent(value)
  } catch {
    return value
  }
}

function extractPublicReferences(content) {
  const pattern = /(?:https?:\/\/[^\s"'`<>]+|\/(?:images|models)\/[^\s"'`<>]+|\/[^\s"'`<>]*(?:resume|cover-letter)[^\s"'`<>]*\.(?:pdf|docx))/gi
  return [...content.matchAll(pattern)]
    .map(match => publicPathnameFromReference(match[0]))
    .filter(Boolean)
}

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function templateReferencePattern(reference) {
  let source = "^"
  let cursor = 0

  for (const match of reference.matchAll(/\$\{[^}]*\}/g)) {
    source += escapeRegularExpression(reference.slice(cursor, match.index))
    source += "[^/]+"
    cursor = match.index + match[0].length
  }

  source += `${escapeRegularExpression(reference.slice(cursor))}$`
  return new RegExp(source)
}

function validatePublicReferences(indexHtml) {
  const publicFiles = walkFiles(publicDirectory)
  const publicPathnames = publicFiles.map(file =>
    `/${path.relative(publicDirectory, file).split(path.sep).join("/")}`,
  )
  const publicPathnameSet = new Set(publicPathnames)
  const sourceFiles = walkFiles(sourceDirectory).filter(file => SOURCE_EXTENSIONS.has(path.extname(file)))
  const inputs = [
    { name: "index.html", content: indexHtml },
    ...sourceFiles.map(file => ({ name: relativeFromRoot(file), content: readFileSync(file, "utf8") })),
  ]

  for (const input of inputs) {
    for (const reference of new Set(extractPublicReferences(input.content))) {
      if (reference.includes("${")) {
        const pattern = templateReferencePattern(reference)
        if (!publicPathnames.some(publicPathname => pattern.test(publicPathname))) {
          fail(`${input.name} references dynamic public asset ${reference}, but no matching file exists`)
        }
        continue
      }

      if (reference.endsWith("/")) {
        const directory = path.resolve(publicDirectory, `.${reference}`)
        if (!directory.startsWith(publicDirectory) || !existsSync(directory) || !statSync(directory).isDirectory()) {
          fail(`${input.name} references missing public directory ${reference}`)
        }
        continue
      }

      if (!publicPathnameSet.has(reference)) {
        fail(`${input.name} references missing public asset ${reference}`)
      }
    }
  }
}

function validateProjectImages(projectsSource) {
  const references = [...projectsSource.matchAll(/["'`](\/images\/projects\/[^"'`$]+)["'`]/g)]
    .map(match => match[1])

  if (references.length === 0) {
    fail("src/data/projects.js must contain project image paths")
  }

  for (const reference of new Set(references)) {
    const absolutePath = path.resolve(publicDirectory, `.${reference}`)
    if (!absolutePath.startsWith(publicDirectory) || !existsSync(absolutePath) || !statSync(absolutePath).isFile()) {
      fail(`src/data/projects.js references missing project image ${reference}`)
    }
  }
}

function validateResumeInventory() {
  for (const filename of EXPECTED_RESUMES) {
    const absolutePath = path.join(publicDirectory, filename)
    if (!existsSync(absolutePath) || !statSync(absolutePath).isFile() || statSync(absolutePath).size === 0) {
      fail(`expected public résumé is missing or empty: ${filename}`)
    }
  }

  const documents = walkFiles(publicDirectory)
    .filter(file => /\.(?:docx|pdf)$/i.test(file))

  for (const document of documents) {
    const publicRelativePath = path.relative(publicDirectory, document).split(path.sep).join("/")
    if (!EXPECTED_RESUMES.has(publicRelativePath)) {
      fail(`obsolete or unexpected public career document remains: public/${publicRelativePath}`)
    }
  }
}

function validateConvertedProjectImages() {
  const projectsImageDirectory = path.join(publicDirectory, "images", "projects")
  const pngFiles = walkFiles(projectsImageDirectory).filter(file => path.extname(file).toLowerCase() === ".png")

  for (const pngFile of pngFiles) {
    fail(`unconverted public project PNG remains: ${relativeFromRoot(pngFile)}`)
  }
}

const indexHtml = readRequired("index.html")
const robots = readRequired("public/robots.txt")
const sitemap = readRequired("public/sitemap.xml")
const headers = readRequired("public/_headers")
const projectsSource = readRequired("src/data/projects.js")

validateIndexHtml(indexHtml)
validateRobotsAndSitemap(robots, sitemap)
validateHeaders(headers)
validatePublicReferences(indexHtml)
validateProjectImages(projectsSource)
validateResumeInventory()
validateConvertedProjectImages()

if (failures.length > 0) {
  console.error(`Portfolio verification failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exitCode = 1
} else {
  console.log("Portfolio verification passed: SEO, crawl files, public assets, résumés, and model loading are consistent.")
}
