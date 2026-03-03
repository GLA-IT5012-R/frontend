frontend
├─.DS_Store
├─.env.local
├─.gitignore
├─README.md
├─components.json
├─directoryList.md
├─eslint.config.mjs
├─middleware.ts
├─next-env.d.ts
├─next.config.ts
├─package-lock.json
├─package.json
├─postcss.config.mjs
├─tsconfig.json
├─utils
|   └axios.tsx
├─slices
|   ├─VideoBlock
|   |     ├─LazyYouTubePlayer.tsx
|   |     └index.tsx
|   ├─ProductGrid
|   |      ├─ProductModelCanvas.tsx
|   |      ├─Scribble.tsx
|   |      └index.tsx
|   ├─Hero
|   |  ├─Hotspot.tsx
|   |  ├─InteractiveSnowboard.tsx
|   |  ├─TallLogo.tsx
|   |  ├─WavyPaths.tsx
|   |  ├─WideLogo.tsx
|   |  └index.tsx
├─public
|   ├─.DS_Store
|   ├─bg-texture.webp
|   ├─board_base.png
|   ├─concrete-normal.avif
|   ├─image-texture.webp
|   ├─paint-background.png
|   ├─snow_ao.jpg
|   ├─snow_diff.jpg
|   ├─snow_normal.png
|   ├─snow_rough.png
|   ├─video-mask.png
|   ├─textures
|   |    ├─.DS_Store
|   |    ├─TX004.png
|   |    ├─headboard.png
|   |    ├─test.png
|   |    ├─test1.png
|   |    └test2.png
|   ├─models
|   |   ├─snowboard.glb
|   |   ├─snowboard_old.glb
|   |   └snowboard_sharp.glb
|   ├─hdr
|   |  ├─warehouse-256.hdr
|   |  ├─warehouse-256.hdr
|   |  └warehouse-hdri.hdr
├─lib
|  ├─useIsSafari.ts
|  ├─utils.ts
|  ├─auth
|  |  └require-auth.tsx
├─hooks
|   └use-mobile.ts
├─data
|  ├─homeData.ts
|  ├─homepage.ts
|  └products.ts
├─contexts
|    ├─auth-context.tsx
|    └paypal-providers.tsx
├─components
|     ├─AppSidebar.tsx
|     ├─Bounded.tsx
|     ├─CustomizeCanvas.tsx
|     ├─CustomizerSelection.tsx
|     ├─Heading.tsx
|     ├─HeroModal.tsx
|     ├─ItemCustomizationForm.tsx
|     ├─Line.tsx
|     ├─Logo.tsx
|     ├─ProductFilters.tsx
|     ├─ProductItem.tsx
|     ├─ProductModelCanvas.tsx
|     ├─SbowboardIcon.tsx
|     ├─SelectComp.tsx
|     ├─SlideIn.tsx
|     ├─Snowboard.jsx
|     ├─SnowboardIcon.tsx
|     ├─user
|     |  ├─Footer.tsx
|     |  └Header.tsx
|     ├─ui
|     | ├─accordion.tsx
|     | ├─button.tsx
|     | ├─card.tsx
|     | ├─chart.tsx
|     | ├─checkbox.tsx
|     | ├─collapsible.tsx
|     | ├─combobox.tsx
|     | ├─dialog.tsx
|     | ├─drawer.tsx
|     | ├─dropdown-menu.tsx
|     | ├─field.tsx
|     | ├─input-group.tsx
|     | ├─input.tsx
|     | ├─label.tsx
|     | ├─native-select.tsx
|     | ├─pagination.tsx
|     | ├─select.tsx
|     | ├─separator.tsx
|     | ├─sheet.tsx
|     | ├─sidebar.tsx
|     | ├─skeleton.tsx
|     | ├─sonner.tsx
|     | ├─switch.tsx
|     | ├─table.tsx
|     | ├─textarea.tsx
|     | └tooltip.tsx
|     ├─modelOriginalJSX
|     |        ├─Snowboard.jsx
|     |        ├─Snowboard_old.jsx
|     |        └Snowboard_sharp.jsx
|     ├─admin
|     |   ├─Header.tsx
|     |   └Slidebar.tsx
├─app
|  ├─globals.css
|  ├─icon.png
|  ├─layout.tsx
|  ├─notfound
|  |    └page.jsx
|  ├─(public)
|  |    ├─layout.tsx
|  |    ├─page.tsx
|  |    ├─test
|  |    |  └page.jsx
|  |    ├─products
|  |    |    ├─Scribble.tsx
|  |    |    ├─others.tsx
|  |    |    └page.tsx
|  |    ├─feedback
|  |    |    ├─InfiniteCarousel.tsx
|  |    |    ├─ReviewCard.tsx
|  |    |    ├─StarRating.tsx
|  |    |    ├─WriteReviewForm.tsx
|  |    |    └page.tsx
|  |    ├─cart
|  |    |  ├─CartCanvas.tsx
|  |    |  └page.tsx
|  |    ├─account
|  |    |    ├─OrderItem.tsx
|  |    |    ├─page.tsx
|  |    |    ├─profile
|  |    |    |    └page.tsx
|  |    |    ├─order
|  |    |    |   ├─OrderCanvas.tsx
|  |    |    |   └page.tsx
|  |    ├─about
|  |    |   ├─data.json
|  |    |   └page.tsx
|  ├─(auth)
|  |   ├─signin
|  |   |   └page.tsx
|  |   ├─sign-up
|  |   |    ├─[[...sign-up]]
|  |   |    |       └page.tsx
|  |   ├─sign-in
|  |   |    ├─[[...sign-in]]
|  |   |    |       └page.tsx
|  |   ├─adminlogin
|  |   |     └page.tsx
|  ├─(admin)
|  |    ├─layout.tsx
|  |    ├─dashboard
|  |    |     └page.tsx
|  |    ├─admin-products
|  |    |       ├─product-lists
|  |    |       |       └page.tsx
|  |    |       ├─product-assets
|  |    |       |       └page.tsx
|  |    ├─admin-orders
|  |    |      └page.tsx
├─api
|  ├─api.ts
|  ├─auth.ts
|  └hello.ts
