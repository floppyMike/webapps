import re
import sys
import minify_html
from pathlib import Path

INCLUDE_RE = re.compile(r"\{\{\s*(.+?)\s*\}\}")


def do_include(base: Path, text: str) -> str:
    def match(m: re.Match) -> str:
        p = Path(m.group(1).strip())

        if not p.is_absolute():
            p = base / p

        return p.read_text(encoding="utf-8")

    return INCLUDE_RE.sub(match, text)


def main():
    if len(sys.argv) < 2:
        print("Usage: include.py <file.html> [...]", file=sys.stderr)
        sys.exit(1)

    for arg in sys.argv[1:]:
        p = Path(arg)
        if not p.exists():
            print(f"Warning: Skipping non existant path: {p}")
            continue
        try:
            p.write_text(minify_html.minify(do_include(p.parent, p.read_text(encoding="utf-8")), minify_js=True, remove_processing_instructions=True), encoding="utf-8")
            print(f"Success: Processed {p}")
        except Exception as e:
            print(f"Error: Failed processing {p}: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
