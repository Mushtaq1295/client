/**
 * C-Lash by Codilia &times; Eylure London &bull; Interactive Prestige Engine
 * Ultra-luxurious, Mobile-First, Vanilla JS 3D Tilt, Parallax & Dynamic Cart
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Authentic Product Catalog Data ---
  const products = [
    {
      id: 1,
      styleNum: "LENGTHENING &bull; NO. 110",
      name: "Lengthening Lash Replacement",
      category: "lengthening",
      price: 5.25,
      rating: 4.9,
      reviewsCount: 319,
      badge: "Allure Award Winner",
      badgeType: "badge-allure",
      specs: ["Graduated Outer Lift", "Eye-Opening Flare", "Latex-Free Glue Included"],
      shortDesc: "Finely tapered outer tips designed to visually open tired or sensitive eyes. Stays securely anchored on bare eyelids all day.",
      image: "images/clash-lengthening.jpg"
    },
    {
      id: 2,
      styleNum: "MULTIPACK &bull; VALUE 3-PACK",
      name: "Naturals Multipack",
      category: "multipack",
      price: 14.45,
      rating: 5.0,
      reviewsCount: 620,
      badge: "Value 3-Pack",
      badgeType: "badge-multipack",
      specs: ["3 Full Lash Pairs", "Sensitive Adhesive Included", "Ergonomic Storage Tray"],
      shortDesc: "Our complete recovery bundle. Three pairs of lightweight Naturals lashes with patented skin-adhering silicone bands.",
      image: "images/clash-multipack.jpg"
    },
    {
      id: 3,
      styleNum: "NATURALS &bull; NO. 101",
      name: "Naturals Lash Replacement",
      category: "natural",
      price: 5.25,
      rating: 4.9,
      reviewsCount: 482,
      badge: "Best Seller",
      badgeType: "badge-sensitive",
      specs: ["Invisible Silicone Strip", "Ultra-Lightweight", "Chemo & Alopecia Safe"],
      shortDesc: "The original award-winning lash designed by cancer survivor Codilia Gapare. Delivers an undetectable, natural everyday frame.",
      image: "images/clash-naturals.jpg"
    },
    {
      id: 4,
      styleNum: "PETITE &bull; NO. 105",
      name: "Petite Lash Replacement",
      category: "natural",
      price: 5.25,
      rating: 4.9,
      reviewsCount: 178,
      badge: "Pre-Tailored",
      badgeType: "badge-sensitive",
      specs: ["Shorter Band Width", "No Scissors Required", "Ideal for Smaller Lids"],
      shortDesc: "Tailored specifically for smaller eyelids or hooded eyes. Eliminates the need to trim, giving instant comfortable placement.",
      image: "images/clash-petite.jpg"
    },
    {
      id: 5,
      styleNum: "VOLUME &bull; NO. 120",
      name: "Volume Lash Replacement",
      category: "volume",
      price: 5.25,
      rating: 4.8,
      reviewsCount: 245,
      badge: "Allure Award Winner",
      badgeType: "badge-allure",
      specs: ["Featherweight Dimension", "Soft Multi-Layers", "Hypoallergenic"],
      shortDesc: "Soft layered density for effortless evening dimension without heavy clumps, pulling, or eyelid fatigue.",
      image: "images/clash-volume.jpg"
    },
    {
      id: 6,
      styleNum: "WISPY &bull; NO. 115",
      name: "Wispy Lash Replacement",
      category: "lengthening",
      price: 5.25,
      rating: 4.8,
      reviewsCount: 124,
      badge: "Featherlight",
      badgeType: "badge-sensitive",
      specs: ["Feathered Texture", "Winged Outer Edge", "Ergonomic Curve Memory"],
      shortDesc: "Delicate criss-cross wisps that gracefully elongate your eye shape while maintaining maximum comfort on sensitive skin.",
      image: "images/clash-wispy.jpg"
    }
  ];

  // --- 2. Application State ---
  const state = {
    cart: [],
    wishlist: new Set(),
    activeFilter: 'all',
    shippingThreshold: 25.00
  };

  // Currency Formatter
  const formatGBP = (amount) => `\u00A3${amount.toFixed(2)}`;

  // --- 3. Interactive 3D Tilt Effect with Specular Glare ---
  const init3DTilt = () => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      let bounds;
      const glare = card.querySelector('.card-glare');

      const handleMouseEnter = () => {
        bounds = card.getBoundingClientRect();
      };

      const handleMouseMove = (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 10;
        const xPct = mouseX / bounds.width;
        const yPct = mouseY / bounds.height;

        const rotateX = ((0.5 - yPct) * maxTilt).toFixed(2);
        const rotateY = ((xPct - 0.5) * maxTilt).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          card.style.setProperty('--glare-x', `${(xPct * 100).toFixed(1)}%`);
          card.style.setProperty('--glare-y', `${(yPct * 100).toFixed(1)}%`);
          card.style.setProperty('--glare-opacity', '0.65');
        }
      };

      const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (glare) {
          card.style.setProperty('--glare-opacity', '0');
        }
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  };

  // --- 4. Render Product Cards (Single Crisp Image per Card) ---
  const renderCatalog = (filter = 'all') => {
    const track = document.getElementById('products-track');
    if (!track) return;

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    track.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.has(product.id);

      return `
        <article class="product-card tilt-card" data-id="${product.id}" data-category="${product.category}" data-tilt data-tilt-max="9">
          <div class="card-glare"></div>

          <div class="product-visual-wrap" data-quick-view="${product.id}" title="Click to inspect lash details">
            <div class="card-badges">
              <span class="product-badge ${product.badgeType}">${product.badge}</span>
            </div>

            <button 
              class="card-fav-btn ${isWishlisted ? 'active' : ''}" 
              data-fav-id="${product.id}" 
              aria-label="${isWishlisted ? 'Remove from favourites' : 'Save to favourites'}"
              title="Add to favourites"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <!-- Single Clean Packaging Image -->
            <img 
              src="${product.image}" 
              alt="${product.name} packaging" 
              class="product-img" 
              loading="lazy" 
            />

            <span class="card-quick-view">Quick View</span>
          </div>

          <div class="product-card-body">
            <div class="product-meta-row">
              <div class="product-rating">
                <span class="rating-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span>${product.rating}</span>
                <span style="color: var(--color-slate-light); font-weight: 400;">(${product.reviewsCount})</span>
              </div>
              <span class="product-code">${product.styleNum.split('&bull;')[0].trim()}</span>
            </div>

            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.shortDesc}</p>

            <div class="product-specs">
              ${product.specs.map(spec => `<span class="spec-chip">${spec}</span>`).join('')}
            </div>

            <div class="product-card-footer">
              <span class="product-price">${formatGBP(product.price)}</span>
              <button class="btn-add-bag" data-add-id="${product.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Reinitialize 3D tilt & attach card events
    init3DTilt();
    attachCatalogEvents();
  };

  // --- 5. Catalog Interactions (Add to Bag, Quick View, Wishlist) ---
  const attachCatalogEvents = () => {
    // Add to Bag buttons
    document.querySelectorAll('[data-add-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-add-id'), 10);
        addToCart(id, 1);

        btn.classList.add('added');
        const origText = btn.innerHTML;
        btn.innerHTML = '&#10003; Added';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.classList.remove('added');
        }, 1200);
      });
    });

    // Wishlist buttons
    document.querySelectorAll('[data-fav-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-fav-id'), 10);
        toggleWishlist(id, btn);
      });
    });

    // Quick View Trigger on Card Visual Click
    document.querySelectorAll('[data-quick-view]').forEach(visual => {
      visual.addEventListener('click', (e) => {
        if (e.target.closest('[data-fav-id]')) return;
        const id = parseInt(visual.getAttribute('data-quick-view'), 10);
        openQuickView(id);
      });
    });
  };

  // --- 6. Category Filter Pills ---
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filter = pill.getAttribute('data-filter');
      state.activeFilter = filter;
      renderCatalog(filter);
    });
  });

  // Footer category links support
  document.querySelectorAll('.footer-links a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');
      const targetPill = document.querySelector(`.filter-pill[data-filter="${filter}"]`);
      if (targetPill) targetPill.click();
      document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- 7. Hero Style Switcher ---
  const heroChipBtns = document.querySelectorAll('.hero-chip-btn');
  const heroMainImg = document.getElementById('hero-main-product-img');

  const heroImageMap = {
    naturals: 'images/clash-naturals.jpg',
    lengthening: 'images/clash-lengthening.jpg',
    volume: 'images/clash-volume.jpg'
  };

  heroChipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      heroChipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const styleKey = btn.getAttribute('data-style-hero');
      const newSrc = heroImageMap[styleKey];

      if (heroMainImg && newSrc) {
        heroMainImg.style.opacity = '0.3';
        heroMainImg.style.transform = 'scale(0.96)';
        setTimeout(() => {
          heroMainImg.src = newSrc;
          heroMainImg.style.opacity = '1';
          heroMainImg.style.transform = 'scale(1)';
        }, 160);
      }
    });
  });

  // --- 8. Shopping Bag Drawer System ---
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartTrigger = document.getElementById('cart-trigger');
  const dockCartTrigger = document.getElementById('dock-cart-trigger');
  const cartClose = document.getElementById('cart-close');
  const cartCountBadges = [
    document.getElementById('cart-count'),
    document.getElementById('dock-cart-count')
  ];
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartDrawerItemsCount = document.getElementById('cart-drawer-items-count');
  const shippingFill = document.getElementById('shipping-fill');
  const shippingMsg = document.getElementById('shipping-msg');

  const openCart = () => {
    cartDrawer?.classList.add('open');
    cartBackdrop?.classList.add('open');
    cartDrawer?.setAttribute('aria-hidden', 'false');
    cartBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartDrawer?.classList.remove('open');
    cartBackdrop?.classList.remove('open');
    cartDrawer?.setAttribute('aria-hidden', 'true');
    cartBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  cartTrigger?.addEventListener('click', openCart);
  dockCartTrigger?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);

  // Add Item to Bag
  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        styleNum: product.styleNum,
        quantity: quantity
      });
    }

    updateCartUI();
    triggerBadgePop();
    openCart();
    showToast(`Added ${product.name} to your bag`);
  };

  const triggerBadgePop = () => {
    cartCountBadges.forEach(badge => {
      if (!badge) return;
      badge.classList.remove('pop');
      void badge.offsetWidth; // Trigger reflow
      badge.classList.add('pop');
    });
  };

  const updateCartUI = () => {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Counters
    cartCountBadges.forEach(b => {
      if (b) b.textContent = totalCount;
    });
    if (cartDrawerItemsCount) {
      cartDrawerItemsCount.textContent = `(${totalCount} ${totalCount === 1 ? 'item' : 'items'})`;
    }

    // Subtotal
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = formatGBP(subtotal);
    }

    // Shipping Progress
    if (shippingFill && shippingMsg) {
      const remaining = Math.max(0, state.shippingThreshold - subtotal);
      const pct = Math.min(100, (subtotal / state.shippingThreshold) * 100);
      shippingFill.style.width = `${pct}%`;

      if (subtotal >= state.shippingThreshold) {
        shippingMsg.innerHTML = '&#10003; You have unlocked <strong>Free UK Royal Mail Delivery</strong>!';
      } else {
        shippingMsg.innerHTML = `Add <strong>${formatGBP(remaining)}</strong> more to unlock <strong>Free UK Delivery</strong>!`;
      }
    }

    // Render Items
    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <h4>Your bag is empty</h4>
          <p>Discover our patented gentle lashes formulated for hair-free sensitive eyelids.</p>
          <a href="#collection" class="btn btn-primary btn-pill" id="empty-cart-shop-btn">
            Shop The Collection
          </a>
        </div>
      `;
      document.getElementById('empty-cart-shop-btn')?.addEventListener('click', closeCart);
      return;
    }

    cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-cart-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">${formatGBP(item.price)}</span>
          <div class="cart-qty-row">
            <div class="qty-control">
              <button class="qty-btn" data-qty-dec="${item.id}" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" data-qty-inc="${item.id}" aria-label="Increase quantity">&#43;</button>
            </div>
            <button class="cart-item-remove" data-remove-id="${item.id}">Remove</button>
          </div>
        </div>
        <div style="font-weight: 700; font-size: 0.9375rem; color: var(--color-obsidian);">
          ${formatGBP(item.price * item.quantity)}
        </div>
      </div>
    `).join('');

    // Attach Cart Stepper Events
    cartItemsContainer.querySelectorAll('[data-qty-inc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-qty-inc'), 10);
        const item = state.cart.find(i => i.id === id);
        if (item) {
          item.quantity += 1;
          updateCartUI();
        }
      });
    });

    cartItemsContainer.querySelectorAll('[data-qty-dec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-qty-dec'), 10);
        const item = state.cart.find(i => i.id === id);
        if (item) {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            state.cart = state.cart.filter(i => i.id !== id);
          }
          updateCartUI();
        }
      });
    });

    cartItemsContainer.querySelectorAll('[data-remove-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-remove-id'), 10);
        state.cart = state.cart.filter(i => i.id !== id);
        updateCartUI();
        showToast('Item removed from shopping bag');
      });
    });
  };

  // Checkout Button Demo
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your shopping bag is empty.');
      return;
    }
    const btn = document.getElementById('checkout-btn');
    btn.innerHTML = 'Connecting to Secure Checkout...';
    setTimeout(() => {
      showToast('Thank you! Redirecting to secure checkout...');
      btn.innerHTML = `<span>Proceed to Secure Checkout</span> <span class="checkout-arrow">&rarr;</span>`;
    }, 1200);
  });

  // --- 9. Wishlist Drawer System ---
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const wishlistBackdrop = document.getElementById('wishlist-backdrop');
  const wishlistTrigger = document.getElementById('wishlist-trigger');
  const dockWishlistTrigger = document.getElementById('dock-wishlist-trigger');
  const wishlistClose = document.getElementById('wishlist-close');
  const wishlistCountBadges = [
    document.getElementById('wishlist-count'),
    document.getElementById('dock-wishlist-count')
  ];
  const wishlistItemsContainer = document.getElementById('wishlist-items-container');

  const openWishlist = () => {
    renderWishlist();
    wishlistDrawer?.classList.add('open');
    wishlistBackdrop?.classList.add('open');
    wishlistDrawer?.setAttribute('aria-hidden', 'false');
    wishlistBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeWishlist = () => {
    wishlistDrawer?.classList.remove('open');
    wishlistBackdrop?.classList.remove('open');
    wishlistDrawer?.setAttribute('aria-hidden', 'true');
    wishlistBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  wishlistTrigger?.addEventListener('click', openWishlist);
  dockWishlistTrigger?.addEventListener('click', openWishlist);
  wishlistClose?.addEventListener('click', closeWishlist);
  wishlistBackdrop?.addEventListener('click', closeWishlist);

  const toggleWishlist = (productId, btnEl) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (state.wishlist.has(productId)) {
      state.wishlist.delete(productId);
      btnEl?.classList.remove('active');
      showToast(`Removed ${product.name} from saved`);
    } else {
      state.wishlist.add(productId);
      btnEl?.classList.add('active');
      showToast(`Saved ${product.name} to favourites`);
    }

    wishlistCountBadges.forEach(b => {
      if (b) b.textContent = state.wishlist.size;
    });
  };

  const renderWishlist = () => {
    if (!wishlistItemsContainer) return;

    if (state.wishlist.size === 0) {
      wishlistItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <h4>No saved lashes yet</h4>
          <p>Tap the heart on any style to save it to your favourites.</p>
          <a href="#collection" class="btn btn-primary btn-pill" id="empty-wishlist-btn">
            Explore Collection
          </a>
        </div>
      `;
      document.getElementById('empty-wishlist-btn')?.addEventListener('click', closeWishlist);
      return;
    }

    const saved = products.filter(p => state.wishlist.has(p.id));

    wishlistItemsContainer.innerHTML = saved.map(p => `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${p.name}</h4>
          <span class="cart-item-price">${formatGBP(p.price)}</span>
        </div>
        <button class="btn-add-bag" data-move-bag="${p.id}" style="padding: 6px 14px; font-size: 0.75rem;">
          Move to Bag
        </button>
      </div>
    `).join('');

    wishlistItemsContainer.querySelectorAll('[data-move-bag]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-move-bag'), 10);
        addToCart(id, 1);
        state.wishlist.delete(id);
        wishlistCountBadges.forEach(b => {
          if (b) b.textContent = state.wishlist.size;
        });
        renderWishlist();
        // Update heart in catalog
        const catBtn = document.querySelector(`[data-fav-id="${id}"]`);
        if (catBtn) catBtn.classList.remove('active');
      });
    });
  };

  // --- 10. Quick View Modal ---
  const qvModal = document.getElementById('quick-view-modal');
  const qvBackdrop = document.getElementById('quick-view-backdrop');
  const qvClose = document.getElementById('quick-view-close');
  const qvContent = document.getElementById('quick-view-content');

  const openQuickView = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product || !qvContent) return;

    qvContent.innerHTML = `
      <div class="modal-img-wrap">
        <img src="${product.image}" alt="${product.name}" id="qv-main-img" />
      </div>

      <div class="modal-details">
        <span class="modal-code">${product.styleNum}</span>
        <h3 class="modal-title">${product.name}</h3>
        <div class="product-rating" style="margin-bottom: 12px;">
          <span class="rating-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span>${product.rating} &bull; Clinical Trial Verified</span>
        </div>
        <span class="modal-price">${formatGBP(product.price)}</span>
        <p class="modal-desc">${product.shortDesc}</p>

        <ul class="modal-specs-list">
          ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
          <li>Translucent flexible silicone baseline adheres smoothly to bare eyelids</li>
          <li>Reusable up to 5 times with proper gentle care</li>
        </ul>

        <button class="btn btn-primary btn-pill btn-full" id="qv-add-btn" style="margin-top: auto;">
          <span>Add to Bag &bull; ${formatGBP(product.price)}</span>
        </button>
      </div>
    `;

    document.getElementById('qv-add-btn')?.addEventListener('click', () => {
      addToCart(product.id, 1);
      closeQuickView();
    });

    qvModal?.classList.add('open');
    qvBackdrop?.classList.add('open');
    qvModal?.setAttribute('aria-hidden', 'false');
    qvBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeQuickView = () => {
    qvModal?.classList.remove('open');
    qvBackdrop?.classList.remove('open');
    qvModal?.setAttribute('aria-hidden', 'true');
    qvBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  qvClose?.addEventListener('click', closeQuickView);
  qvBackdrop?.addEventListener('click', closeQuickView);

  // --- 11. Live Search Modal ---
  const searchModal = document.getElementById('search-modal');
  const searchBackdrop = document.getElementById('search-backdrop');
  const searchTrigger = document.getElementById('search-trigger');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const openSearch = () => {
    searchModal?.classList.add('open');
    searchBackdrop?.classList.add('open');
    searchModal?.setAttribute('aria-hidden', 'false');
    searchBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  };

  const closeSearch = () => {
    searchModal?.classList.remove('open');
    searchBackdrop?.classList.remove('open');
    searchModal?.setAttribute('aria-hidden', 'true');
    searchBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  };

  searchTrigger?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  searchBackdrop?.addEventListener('click', closeSearch);

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!searchResults) return;

    if (!query) {
      searchResults.innerHTML = '';
      return;
    }

    const matches = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) || 
      p.shortDesc.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p style="padding: 16px; font-size: 0.875rem; color: var(--color-taupe); text-align: center;">No matching lash styles found for "${query}"</p>`;
      return;
    }

    searchResults.innerHTML = matches.map(p => `
      <div class="search-item" data-search-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" class="search-item-img" />
        <div class="search-item-info">
          <h5 class="search-item-title">${p.name}</h5>
          <span class="search-item-meta">${formatGBP(p.price)} &bull; ${p.category}</span>
        </div>
        <button class="btn btn-primary btn-pill" style="padding: 6px 14px; font-size: 0.75rem;">View</button>
      </div>
    `).join('');

    searchResults.querySelectorAll('.search-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.getAttribute('data-search-id'), 10);
        closeSearch();
        openQuickView(id);
      });
    });
  });

  // --- 12. Mobile Menu Drawer Navigation ---
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');

  const openMobileDrawer = () => {
    mobileDrawer?.classList.add('open');
    mobileDrawerOverlay?.classList.add('open');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileDrawer = () => {
    mobileDrawer?.classList.remove('open');
    mobileDrawerOverlay?.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openMobileDrawer);
  drawerClose?.addEventListener('click', closeMobileDrawer);
  mobileDrawerOverlay?.addEventListener('click', closeMobileDrawer);

  document.querySelectorAll('[data-close-drawer]').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // --- 13. Interactive FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- 14. Sticky Header Blur Elevation on Scroll ---
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- 15. Newsletter Subscription Simulation ---
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast('Welcome to C-Lash! Check your inbox for 10% off.');
      input.value = '';
    }
  });

  // --- 16. Toast Notification Manager ---
  const toastStack = document.getElementById('toast-stack');
  const showToast = (message) => {
    if (!toastStack) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" style="color: var(--color-primary); flex-shrink: 0;">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    `;

    toastStack.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 320);
    }, 3500);
  };

  // Keyboard accessibility: Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeWishlist();
      closeQuickView();
      closeSearch();
      closeMobileDrawer();
    }
  });

  // --- 17. Initial Render ---
  renderCatalog('all');
  init3DTilt();
});
