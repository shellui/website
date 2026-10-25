# Brand kit PDF builder

Python sources for the Shellui brand kit PDF. Colors load from [`tokens/tokens.json`](../../tokens/tokens.json) via `common.py`.

```bash
cd tools/brand-kit/src-v1
python3 build.py
```

Set `BRAND_ASSETS` to the repo `brand-assets/` directory when regenerating PNG previews. The website ships `brand-assets/shellui-brand-kit-v1.pdf`; rebuild on major brand releases.
