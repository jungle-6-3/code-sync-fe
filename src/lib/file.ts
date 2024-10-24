interface LanguageMapping {
  [key: string]: string;
}

const fileExtensionsToLanguage: LanguageMapping = {
  // A
  abap: "abap",
  cls: "apex",
  azcli: "azcli",

  // B
  bat: "bat",
  cmd: "bat",
  bicep: "bicep",

  // C
  mligo: "cameligo",
  clj: "clojure",
  cljs: "clojure",
  coffee: "coffee",
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  hpp: "cpp",
  hh: "cpp",
  cs: "csharp",
  csp: "csp",
  css: "css",

  // D
  dart: "dart",
  dockerfile: "dockerfile",

  // E
  ecl: "ecl",
  ex: "elixir",
  exs: "elixir",

  // F
  flow: "flow9",
  fs: "fsharp",
  fsx: "fsharp",
  fsi: "fsharp",

  // G
  go: "go",
  graphql: "graphql",
  gql: "graphql",

  // H
  hbs: "handlebars",
  handlebars: "handlebars",
  tf: "hcl",
  hcl: "hcl",
  html: "html",
  htm: "html",

  // I
  ini: "ini",
  cfg: "ini",

  // J
  java: "java",
  js: "javascript",
  jsx: "javascript",
  json: "json",
  jl: "julia",

  // K
  kt: "kotlin",
  kts: "kotlin",

  // L
  less: "less",
  lxn: "lexon",
  lua: "lua",

  // M
  m3: "m3",
  md: "markdown",
  markdown: "markdown",
  s: "mips",
  msdax: "msdax",
  mysql: "mysql",

  // O
  m: "objective-c",
  mm: "objective-c",

  // P
  pas: "pascal",
  ligo: "pascaligo",
  pl: "perl",
  pm: "perl",
  pgsql: "pgsql",
  php: "php",
  txt: "plaintext",
  pats: "postiats",
  pq: "powerquery",
  ps1: "powershell",
  pug: "pug",
  jade: "pug",
  py: "python",

  // R
  r: "r",
  cshtml: "razor",
  redis: "redis",
  redshift: "redshift",
  rst: "restructuredtext",
  rb: "ruby",
  rs: "rust",

  // S
  sb: "sb",
  scala: "scala",
  scm: "scheme",
  ss: "scheme",
  scss: "scss",
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  sol: "sol",
  sql: "sql",
  st: "st",
  swift: "swift",
  sv: "systemverilog",
  svh: "systemverilog",

  // T
  tcl: "tcl",
  twig: "twig",
  ts: "typescript",
  tsx: "typescript",

  // V
  vb: "vb",
  v: "verilog",

  // X
  xml: "xml",
  xaml: "xml",
  svg: "xml",

  // Y
  yaml: "yaml",
  yml: "yaml",
};

export const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName.toLowerCase().split(".").pop() || "";
  return fileExtensionsToLanguage[extension] || "plaintext";
};
