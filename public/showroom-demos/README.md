# Showroom demos

Each folder in this directory is a standalone, responsive concept website rendered inside the S2P2 showroom preview iframe.

## Structure

```text
showroom-demos/
  shared/
    demo.js
  cafe-01/
    index.html
    styles.css
  bakery-01/
    index.html
    styles.css
```

The folder name must match the showroom product slug. Set the product's `demoUrl` in `src/data/showroom.ts` to `/showroom-demos/<slug>/index.html`.

## Rules

- Keep demos independent from the Next.js and Tailwind bundles.
- Use relative links for demo CSS and the shared script.
- Keep all layouts responsive at their own document viewport width.
- Add `data-product="<slug>"` to the body.
- Add `data-customize` to buttons that should open the S2P2 contact widget.
- Do not use links that navigate the iframe to portfolio routes.
- Do not store lead forms or duplicate the contact automation inside a demo.
- Mark concept pages `noindex, nofollow`.

The preview shell uses a sandboxed iframe and listens only to messages from that iframe. `shared/demo.js` sends the `s2p2:customize` message for contact integration.

## Stock photography

The current concept photography is downloaded locally from Unsplash so previews do not depend on runtime hotlinks. Each demo has:

- `hero.jpg` at 1600 × 1200 (4:3)
- `detail.jpg` at 1200 × 1500 (4:5)

Source photo IDs:

| Demo | Hero | Detail |
| --- | --- | --- |
| Café | `photo-1495474472287-4d71bcdd2085` | `photo-1554118811-1e0d58224f24` |
| Bakery | `photo-1509440159596-0249088772ff` | `photo-1517433670267-08bbd4be890f` |
| Gym | `photo-1534438327276-14e5300c3a48` | `photo-1581009146145-b5ef050c2e1e` |
| Salon | `photo-1560066984-138dadb4c035` | `photo-1521590832167-7bcbfaa6381f` |
| Photographer | `photo-1452780212940-6f5c0d14d848` | `photo-1519741497674-611481863552` |
| Interior Studio | `photo-1600210492486-724fe5c67fb0` | `photo-1600566753190-17f0baa2a6c3` |

Replace these concept images with licensed client media before presenting a customized site as completed client work.
