# Cloud.mu deployment

This is a static Angular website and does not require Node.js, Java, Docker or a database on the
server.

## Build

1. Install the project dependencies with `pnpm install`.
2. Run `pnpm run build:cloud`.
3. The deployable files will be in `dist/topman-realstyle/browser/`.

## Upload with cPanel

1. Back up the existing website files in cPanel.
2. Open the domain's document root, normally `public_html`.
3. Upload the **contents** of `dist/topman-realstyle/browser/`, not the `browser` folder itself.
4. Confirm that `.htaccess` was uploaded; cPanel may hide dotfiles by default.
5. Enable the free SSL certificate and force HTTPS in cPanel.
6. Test the homepage and a direct category URL such as `/collections/suits`.

The supplied `.htaccess` sends Angular routes to `index.html` and enables long-lived caching for
hashed scripts, styles and optimized images. JSON catalogue files use short/no caching so catalogue
updates appear promptly after deployment.

## Updating the catalogue

Edit `public/data/*.json`, add optimized images under `public/images`, rebuild, and upload the new
`browser` contents. Always run `pnpm run validate:catalogue` before building.

The contact details, full store list and exact opening hours are deliberately marked as unconfirmed
and must be replaced before public launch.
