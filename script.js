/**
 * C-LASH BY CODILIA (EYLURE LONDON COLLABORATION)
 * D2C Luxury E-Commerce Landing Page Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Global Application State ---
  const state = {
    currency: 'GBP',
    currencyRates: {
      GBP: { symbol: '£', rate: 1.0 },
      USD: { symbol: '$', rate: 1.28 },
      EUR: { symbol: '€', rate: 1.16 }
    },
    cart: [],
    wishlist: new Set(),
    activeFilter: 'all',
    appliedPromo: null,
    freeShippingThresholdGBP: 25.00
  };

  // --- Product Catalog Data (Authentic Eylure C-Lash Collection) ---
  const products = [
    {
      id: 1,
      styleNum: "NATURALS &bull; NO. 101",
      name: "Eylure C-Lash Naturals",
      category: "natural",
      priceGBP: 5.25,
      rating: 4.9,
      reviewsCount: 482,
      badge: "Allure Award Winner",
      badgeType: "bestseller",
      specs: ["Invisible Silicone Strip", "Ultra-Lightweight", "Glue Included"],
      shortDesc: "Created specifically for lash replacement with a soft, flexible & invisible band that aids application. Designed by cancer survivor Codilia Gapare.",
      fullDesc: "Engineered specifically for complete eyelash loss. Features Codilia Gapare's patented flexible silicone edge that provides a stable, wide-contact base adhering directly to bare eyelid skin. Soft, wispy fibres create the illusion of natural flutter and warmth.",
      images: {
        primary: "images/clash-naturals.jpg",
        secondary: "images/clash-naturals.jpg",
        gallery: [
          "images/clash-naturals.jpg",
          "images/clash-catalog-all.jpg"
        ]
      }
    },
    {
      id: 2,
      styleNum: "LENGTHENING &bull; NO. 110",
      name: "Eylure C-Lash Lengthening",
      category: "lengthening",
      priceGBP: 5.25,
      rating: 4.9,
      reviewsCount: 319,
      badge: "Allure Award Winner",
      badgeType: "sensitive",
      specs: ["Tapered Outer Tips", "Eye-Opening Lift", "Skin-Safe Silicone"],
      shortDesc: "Finely tapered tips with subtle graduated length towards the outer corners to visually open and brighten tired or sensitive eyes.",
      fullDesc: "Designed to provide an uplifting, wide-awake effect without weighing down tender lids. The flexible curved silicone strip stays upright on bare skin all day long with zero drooping or flipping.",
      images: {
        primary: "images/clash-lengthening.jpg",
        secondary: "images/clash-lengthening.jpg",
        gallery: [
          "images/clash-lengthening.jpg",
          "images/clash-catalog-all.jpg"
        ]
      }
    },
    {
      id: 3,
      styleNum: "VOLUME &bull; NO. 120",
      name: "Eylure C-Lash Volume",
      category: "volume",
      priceGBP: 5.25,
      rating: 4.8,
      reviewsCount: 245,
      badge: "Allure Award Winner",
      badgeType: "bestseller",
      specs: ["Soft Dimensional Depth", "Weightless Fibres", "Hypoallergenic"],
      shortDesc: "Multi-layered softness for when you want a touch of evening glamour without heavy clumps or eyelid fatigue.",
      fullDesc: "Features clustered wisps of ultra-soft synthetic hair anchored into a clear, flexible medical silicone strip. Delivers touchable density and soft definition that flatters every eye shape.",
      images: {
        primary: "images/clash-volume.jpg",
        secondary: "images/clash-volume.jpg",
        gallery: [
          "images/clash-volume.jpg",
          "images/clash-catalog-all.jpg"
        ]
      }
    },
    {
      id: 4,
      styleNum: "PETITE &bull; NO. 105",
      name: "Eylure C-Lash Petite",
      category: "natural",
      priceGBP: 5.25,
      rating: 4.9,
      reviewsCount: 178,
      badge: "Allure Award Winner",
      badgeType: "sensitive",
      specs: ["Shorter Band Width", "Subtle Daytime Density", "No Trimming Needed"],
      shortDesc: "Specially proportioned for smaller eyelids, hooded eyes, or anyone who prefers a shorter band width straight out of the box.",
      fullDesc: "Eliminates the fuss of scissors! Pre-tailored with a shorter silicone strip and gentle lash length so you can apply instantly. Hugs delicate eyelids with comfortable ease.",
      images: {
        primary: "images/clash-petite.jpg",
        secondary: "images/clash-petite.jpg",
        gallery: [
          "images/clash-petite.jpg",
          "images/clash-catalog-all.jpg"
        ]
      }
    },
    {
      id: 5,
      styleNum: "WISPY &bull; NO. 115",
      name: "Eylure C-Lash Wispy",
      category: "lengthening",
      priceGBP: 5.25,
      rating: 4.8,
      reviewsCount: 124,
      badge: "Allure Award Winner",
      badgeType: "sensitive",
      specs: ["Winged Outer Lift", "Featherweight", "Silicone Curve Memory"],
      shortDesc: "Delicate cat-eye wing effect with longer outer clusters to elongate your eye shape gracefully.",
      fullDesc: "Provides a gentle, dignified lift. The patented curved silicone strip retains its ergonomic memory through multiple wears and washes, gently adapting to natural eye movement.",
      images: {
        primary: "images/clash-wispy.jpg",
        secondary: "images/clash-wispy.jpg",
        gallery: [
          "images/clash-wispy.jpg",
          "images/clash-catalog-all.jpg"
        ]
      }
    },
    {
      id: 6,
      styleNum: "MULTIPACK &bull; 3-PACK",
      name: "Eylure C-Lash Naturals Multipack",
      category: "multipack",
      priceGBP: 15.95,
      wasPriceGBP: 18.00,
      rating: 5.0,
      reviewsCount: 620,
      badge: "Value 3-Pack",
      badgeType: "save",
      specs: ["3 Full Lash Pairs", "Full-Size Sensitive Glue", "Lash Replacement"],
      shortDesc: "Complete oncology & alopecia care bundle. Contains 3 pairs of Naturals lashes with flexible invisible bands and gentle latex-free adhesive.",
      fullDesc: "Our most beloved gift set and medical treatment companion. Everything you need from daily natural elegance to special evening dinners. Packaged in a soft-touch luxury keepsake box with an application mirror.",
      images: {
        primary: "images/clash-multipack.jpg",
        secondary: "images/clash-multipack.jpg",
        gallery: [
          "images/clash-multipack.jpg",
          "images/clash-catalog-all.jpg"
        ]
      }
    }
  ];

  // Video Reel Data
  const videoReels = {
    founder: {
      title: "Codilia Gapare: The Story Behind C-Lash & Eylure London",
      speaker: "CODILIA GAPARE &bull; BBC FEATURE",
      caption: "“I created C-Lash because losing lashes during breast cancer made me lose my expression. Getting them back wasn’t vanity — it made me feel like myself again.”",
      bgImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
      desc: "Originally featured on BBC News & Sunday Times Style. How a breast cancer diagnosis in 2014 inspired an international cosmetic breakthrough."
    },
    "reel-1": {
      title: "Sarah's Chemo Journey: Restoring My Confidence",
      speaker: "SARAH M. &bull; POST-CHEMO PATIENT REVIEW",
      caption: "“After cycle 4 my natural lashes were completely gone. Standard lashes slipped right into my eyes. C-Lash stayed on for my entire sister’s wedding!”",
      bgImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
      desc: "Real patient testimony on how the flexible silicone band feels on sensitised post-chemotherapy skin."
    },
    "reel-2": {
      title: "Application Masterclass with Oncology Nurse Emma",
      speaker: "NURSE EMMA R. &bull; AESTHETICS & ONCOLOGY SPECIALIST",
      caption: "“The secret is the broader silicone contact plane. You don't need hair to anchor it. Just press gently against the lid and let the hypoallergenic bond set.”",
      bgImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
      desc: "Clinical step-by-step guidance for patients and beauty enthusiasts applying false lashes to bare eyelids."
    },
    "reel-3": {
      title: "Living with Alopecia Totalis: The Only Lashes That Work",
      speaker: "KIRAN T. &bull; ALOPECIA UK ADVOCATE",
      caption: "“I've lived with Alopecia for 12 years. Magnetic lashes require glue or hair. C-Lash is the first product ever engineered with our exact anatomy in mind.”",
      bgImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      desc: "In-depth review exploring day-to-night longevity and pain-free removal for those with total hair loss."
    },
    "reel-4": {
      title: "Dermatologist Review: Skin-Safe Silicone Technology",
      speaker: "DR. CLARA H. &bull; COSMETIC DERMATOLOGY ADVISOR",
      caption: "“Traditional latex adhesives and cotton bands cause contact dermatitis on bare lids. C-Lash's medical-grade silicone prevents chemical irritation.”",
      bgImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",
      desc: "Medical explanation of biocompatible silicone band dynamics and gentle removal without follicular traction."
    }
  };

  // --- Utility Functions ---
  const formatPrice = (amountInGBP) => {
    const cur = state.currencyRates[state.currency];
    const converted = amountInGBP * cur.rate;
    return `${cur.symbol}${converted.toFixed(2)}`;
  };

  const showToast = (message, icon = '✓', isBlush = false) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${isBlush ? 'toast-blush' : ''}`;
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // --- Render Products in Catalog Grid ---
  const renderProducts = (category = 'all') => {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filtered = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    grid.innerHTML = filtered.map(product => {
      const isWishlisted = state.wishlist.has(product.id);
      const wasPriceFormatted = product.wasPriceGBP ? formatPrice(product.wasPriceGBP) : null;
      
      return `
        <article class="product-card" data-id="${product.id}" data-category="${product.category}">
          <div class="product-card-visual">
            <div class="card-badges">
              <span class="card-badge ${product.badgeType}">${product.badge}</span>
            </div>

            <button 
              class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
              data-id="${product.id}" 
              aria-label="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}"
              title="Add to wishlist"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-icon">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <img 
              src="${product.images.primary}" 
              alt="${product.name} gentle false eyelash packaging" 
              class="product-img" 
              loading="lazy"
            />

            <button class="card-quick-view" data-id="${product.id}">
              Quick View
            </button>
          </div>

          <div class="product-card-body">
            <div class="product-rating">
              <span class="stars" aria-hidden="true">★★★★★</span>
              <span class="rating-val">${product.rating}</span>
              <span class="rating-count">(${product.reviewsCount} reviews)</span>
            </div>

            <div class="product-style-num">${product.styleNum}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.shortDesc}</p>

            <div class="product-specs-pills">
              ${product.specs.map(spec => `<span class="spec-pill">${spec}</span>`).join('')}
            </div>

            <div class="product-card-footer">
              <div class="product-price">
                <span class="price-current">${formatPrice(product.priceGBP)}</span>
                ${wasPriceFormatted ? `<span class="price-original">${wasPriceFormatted}</span>` : ''}
              </div>

              <button class="btn-add-cart" data-id="${product.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachCatalogEventListeners();
  };

  // Attach event listeners to card elements
  const attachCatalogEventListeners = () => {
    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        addToCart(id);
        
        // Button state feedback
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ Added`;
        btn.classList.add('added');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('added');
        }, 1200);
      });
    });

    // Wishlist buttons
    document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        toggleWishlist(id, btn);
      });
    });

    // Quick view buttons
    document.querySelectorAll('.card-quick-view').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        openQuickViewModal(id);
      });
    });
  };

  // --- Cart Drawer Management ---
  const upsellProducts = [
    {
      id: 91,
      name: "Precision Ergonomic Wand",
      priceGBP: 2.95,
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 92,
      name: "Chamomile Latex-Free Glue 5ml",
      priceGBP: 3.45,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartTrigger = document.getElementById('cart-trigger');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartCountBadges = [
    document.getElementById('cart-count'),
    document.getElementById('cart-drawer-count')
  ];

  const openCart = () => {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.cart-trigger').forEach(trigger => {
    trigger.addEventListener('click', openCart);
  });
  cartCloseBtn?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);

  // Add Item to Cart
  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        styleNum: product.styleNum,
        priceGBP: product.priceGBP,
        image: product.images.primary,
        quantity: quantity
      });
    }

    updateCartUI();
    triggerBadgePulse(document.getElementById('cart-count'));
    showToast(`Added ${quantity > 1 ? quantity + 'x ' : ''}${product.name} to your bag`);
    openCart();
  };

  const triggerBadgePulse = (badgeEl) => {
    if (!badgeEl) return;
    badgeEl.classList.remove('pulse');
    void badgeEl.offsetWidth; // Trigger reflow
    badgeEl.classList.add('pulse');
  };

  // Update Cart UI
  const updateCartUI = () => {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(el => {
      if (el) el.textContent = totalItems;
    });

    const itemsContainer = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-drawer-footer');
    const shippingTracker = document.querySelector('.cart-shipping-tracker');

    if (state.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">🛍️</div>
          <h3>Your shopping bag is empty</h3>
          <p>Explore our patented gentle lashes designed to restore your natural beauty.</p>
          <a href="#collection" class="btn btn-primary" id="cart-empty-shop-btn">Shop Lash Collection</a>
        </div>
      `;
      document.getElementById('cart-empty-shop-btn')?.addEventListener('click', () => {
        closeCart();
      });
      if (footer) footer.style.display = 'none';
      if (shippingTracker) shippingTracker.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';
    if (shippingTracker) shippingTracker.style.display = 'block';

    // Render items list
    itemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <span class="cart-item-style">${item.styleNum}</span>
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">${formatPrice(item.priceGBP)}</span>
          <div class="cart-item-qty-row">
            <div class="qty-control">
              <button class="qty-btn btn-cart-dec" data-id="${item.id}" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn btn-cart-inc" data-id="${item.id}" aria-label="Increase quantity">&#43;</button>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">Remove</button>
          </div>
        </div>
        <div class="cart-item-subtotal">
          <strong>${formatPrice(item.priceGBP * item.quantity)}</strong>
        </div>
      </div>
    `).join('');

    // Attach listeners for qty buttons
    itemsContainer.querySelectorAll('.btn-cart-inc').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = state.cart.find(i => i.id === id);
        if (item) {
          item.quantity += 1;
          updateCartUI();
        }
      });
    });

    itemsContainer.querySelectorAll('.btn-cart-dec').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const item = state.cart.find(i => i.id === id);
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.cart = state.cart.filter(i => i.id !== id);
          }
          updateCartUI();
        }
      });
    });

    itemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        state.cart = state.cart.filter(i => i.id !== id);
        updateCartUI();
        showToast('Item removed from shopping bag');
      });
    });

    // Subtotal and shipping calculations
    const subtotalGBP = state.cart.reduce((sum, item) => sum + (item.priceGBP * item.quantity), 0);
    const shippingProgressFill = document.getElementById('shipping-progress-fill');
    const shippingLabel = document.getElementById('shipping-tracker-label');

    const progressPct = Math.min(100, (subtotalGBP / state.freeShippingThresholdGBP) * 100);
    if (shippingProgressFill) shippingProgressFill.style.width = `${progressPct}%`;

    const remainingGBP = Math.max(0, state.freeShippingThresholdGBP - subtotalGBP);
    const hasFreeShipping = subtotalGBP >= state.freeShippingThresholdGBP;

    if (shippingLabel) {
      if (hasFreeShipping) {
        shippingLabel.innerHTML = `🎉 Congratulations! You have unlocked <strong>Free UK Delivery</strong>!`;
      } else {
        shippingLabel.innerHTML = `Add <span class="shipping-remaining">${formatPrice(remainingGBP)}</span> more to qualify for <strong>Free UK Delivery</strong>!`;
      }
    }

    // Discounts
    let discountGBP = 0;
    const discountRow = document.getElementById('cart-discount-row');
    const discountAmount = document.getElementById('cart-discount-amount');

    if (state.appliedPromo === 'WELCOME10') {
      discountGBP = subtotalGBP * 0.10;
      if (discountRow) discountRow.hidden = false;
      if (discountAmount) discountAmount.textContent = `-${formatPrice(discountGBP)}`;
    } else {
      if (discountRow) discountRow.hidden = true;
    }

    // Shipping cost
    const standardShippingGBP = hasFreeShipping ? 0 : 3.50;
    const shippingCostLabel = document.getElementById('cart-shipping-cost');
    if (shippingCostLabel) {
      shippingCostLabel.textContent = hasFreeShipping ? 'FREE' : formatPrice(standardShippingGBP);
    }

    // Grand total
    const grandTotalGBP = Math.max(0, (subtotalGBP - discountGBP) + standardShippingGBP);
    
    document.getElementById('cart-subtotal').textContent = formatPrice(subtotalGBP);
    document.getElementById('cart-grand-total').textContent = formatPrice(grandTotalGBP);

    // Update mobile bottom bar cart badge
    const bbCartBadge = document.getElementById('bb-cart-badge');
    if (bbCartBadge) bbCartBadge.textContent = totalItems;

    // Render Upsell items
    const upsellBlock = document.getElementById('cart-upsell-block');
    const upsellList = document.getElementById('upsell-list');
    if (upsellBlock) {
      upsellBlock.style.display = state.cart.length > 0 ? 'block' : 'none';
    }
    if (upsellList && state.cart.length > 0) {
      upsellList.innerHTML = upsellProducts.map(u => {
        const inCart = state.cart.some(item => item.id === u.id);
        return `
          <div class="upsell-item" data-id="${u.id}">
            <img src="${u.image}" alt="${u.name}" class="upsell-thumb">
            <div class="upsell-info">
              <span class="upsell-name">${u.name}</span>
              <span class="upsell-price">${formatPrice(u.priceGBP)}</span>
            </div>
            <button class="btn-upsell-add ${inCart ? 'added' : ''}" data-id="${u.id}">
              ${inCart ? '✓ Added' : '+ Add'}
            </button>
          </div>
        `;
      }).join('');

      upsellList.querySelectorAll('.btn-upsell-add').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'), 10);
          const uProd = upsellProducts.find(p => p.id === id);
          if (uProd) {
            const existing = state.cart.find(i => i.id === uProd.id);
            if (existing) {
              existing.quantity += 1;
            } else {
              state.cart.push({
                id: uProd.id,
                name: uProd.name,
                styleNum: "CARE KIT",
                priceGBP: uProd.priceGBP,
                image: uProd.image,
                quantity: 1
              });
            }
            updateCartUI();
            showToast(`Added ${uProd.name} to your bag`);
          }
        });
      });
    }
  };

  // Promo Code Application
  const promoApplyBtn = document.getElementById('promo-apply-btn');
  const promoInput = document.getElementById('promo-input');
  const promoFeedback = document.getElementById('promo-feedback');

  promoApplyBtn?.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME10') {
      state.appliedPromo = 'WELCOME10';
      promoFeedback.className = 'promo-feedback success';
      promoFeedback.textContent = 'Code WELCOME10 applied! 10% off your entire bag.';
      updateCartUI();
    } else {
      promoFeedback.className = 'promo-feedback error';
      promoFeedback.textContent = 'Invalid promo code. Try "WELCOME10".';
    }
  });

  // Checkout Button
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn?.addEventListener('click', () => {
    if (state.cart.length === 0) return;
    const originalText = checkoutBtn.innerHTML;
    checkoutBtn.disabled = true;
    checkoutBtn.innerHTML = `
      <span>Securing your order...</span>
    `;

    setTimeout(() => {
      checkoutBtn.disabled = false;
      checkoutBtn.innerHTML = originalText;
      showToast('Thank you! Redirecting to secure checkout payment portal...', '🔒');
      setTimeout(() => {
        alert('Demo Store Notice: This completes the C-Lash preview. In production, this securely directs to Shopify Plus / Stripe Checkout.');
      }, 500);
    }, 1200);
  });

  // --- Category Filter Tabs ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const category = tab.getAttribute('data-category');
      state.activeFilter = category;
      
      const grid = document.getElementById('products-grid');
      if (grid) {
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(10px)';
        grid.style.transition = 'all 0.25s ease';
        
        setTimeout(() => {
          renderProducts(category);
          grid.style.opacity = '1';
          grid.style.transform = 'translateY(0)';
        }, 250);
      }
    });
  });

  // Footer category links support
  document.querySelectorAll('.footer-nav a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.getAttribute('data-filter');
      const targetTab = document.querySelector(`.filter-tab[data-category="${filter}"]`);
      if (targetTab) {
        targetTab.click();
      }
    });
  });

  // --- Quick View Modal ---
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewBackdrop = document.getElementById('quick-view-backdrop');
  const quickViewClose = document.getElementById('quick-view-close');
  const quickViewContent = document.getElementById('quick-view-content');

  const openQuickViewModal = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let selectedQty = 1;

    quickViewContent.innerHTML = `
      <div class="modal-gallery">
        <img src="${product.images.primary}" alt="${product.name}" class="modal-main-img" id="modal-active-img">
        <div class="modal-thumbnails">
          ${product.images.gallery.map((img, i) => `
            <img src="${img}" alt="Thumbnail ${i + 1}" class="modal-thumb ${i === 0 ? 'active' : ''}" data-full="${img}">
          `).join('')}
        </div>
      </div>

      <div class="modal-details">
        <span class="modal-category-tag">${product.styleNum} &bull; ${product.category}</span>
        <h2 id="modal-prod-title" class="modal-prod-title">${product.name}</h2>

        <div class="modal-rating-row">
          <span class="stars">★★★★★</span>
          <strong>${product.rating} / 5.0</strong>
          <span class="rating-count">(${product.reviewsCount} verified patient & customer reviews)</span>
        </div>

        <div class="modal-price-row">
          <span class="modal-price">${formatPrice(product.priceGBP)}</span>
          ${product.wasPriceGBP ? `<span class="modal-price-was">${formatPrice(product.wasPriceGBP)}</span>` : ''}
          <span class="badge-pill">Latex-Free Adhesive Included</span>
        </div>

        <p class="modal-description">${product.fullDesc}</p>

        <div class="modal-feature-box">
          <h5>Patented Gentle Design Features</h5>
          <ul>
            <li>✦ <strong>Self-adhering silicone band:</strong> Formulated for bare eyelid skin.</li>
            <li>✦ <strong>No natural lash needed:</strong> Wide-contact stability prevents flipping.</li>
            <li>✦ <strong>Reusable up to 10 wears:</strong> Easy soap & warm water cleanup.</li>
          </ul>
        </div>

        <div class="modal-action-row">
          <div class="modal-qty-selector">
            <button class="modal-qty-btn" id="modal-qty-dec">&minus;</button>
            <span class="modal-qty-num" id="modal-qty-display">1</span>
            <button class="modal-qty-btn" id="modal-qty-inc">&#43;</button>
          </div>

          <button class="btn btn-primary modal-add-btn" id="modal-add-to-cart">
            <span>Add to Shopping Bag &bull; ${formatPrice(product.priceGBP)}</span>
          </button>
        </div>
      </div>
    `;

    // Gallery thumbnail interaction
    quickViewContent.querySelectorAll('.modal-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        quickViewContent.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const activeImg = document.getElementById('modal-active-img');
        if (activeImg) activeImg.src = thumb.getAttribute('data-full');
      });
    });

    // Quantity selectors in modal
    const qtyDisplay = document.getElementById('modal-qty-display');
    const modalAddBtn = document.getElementById('modal-add-to-cart');

    document.getElementById('modal-qty-inc')?.addEventListener('click', () => {
      selectedQty += 1;
      qtyDisplay.textContent = selectedQty;
      modalAddBtn.querySelector('span').textContent = `Add to Shopping Bag • ${formatPrice(product.priceGBP * selectedQty)}`;
    });

    document.getElementById('modal-qty-dec')?.addEventListener('click', () => {
      if (selectedQty > 1) {
        selectedQty -= 1;
        qtyDisplay.textContent = selectedQty;
        modalAddBtn.querySelector('span').textContent = `Add to Shopping Bag • ${formatPrice(product.priceGBP * selectedQty)}`;
      }
    });

    modalAddBtn?.addEventListener('click', () => {
      addToCart(product.id, selectedQty);
      closeQuickView();
    });

    quickViewModal.classList.add('open');
    quickViewBackdrop.classList.add('open');
    quickViewModal.setAttribute('aria-hidden', 'false');
    quickViewBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeQuickView = () => {
    quickViewModal.classList.remove('open');
    quickViewBackdrop.classList.remove('open');
    quickViewModal.setAttribute('aria-hidden', 'true');
    quickViewBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  quickViewClose?.addEventListener('click', closeQuickView);
  quickViewBackdrop?.addEventListener('click', closeQuickView);

  // --- Wishlist System ---
  const wishlistModal = document.getElementById('wishlist-modal');
  const wishlistBackdrop = document.getElementById('wishlist-backdrop');
  const wishlistClose = document.getElementById('wishlist-modal-close');
  const wishlistTrigger = document.getElementById('wishlist-trigger');
  const wishlistCountBadge = document.getElementById('wishlist-count');
  const wishlistModalCount = document.getElementById('wishlist-modal-count');

  const updateWishlistUI = () => {
    const count = state.wishlist.size;
    if (wishlistCountBadge) wishlistCountBadge.textContent = count;
    if (wishlistModalCount) wishlistModalCount.textContent = count;
    const bbWishlistBadge = document.getElementById('bb-wishlist-badge');
    if (bbWishlistBadge) bbWishlistBadge.textContent = count;

    // Update active state on product cards
    document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      if (state.wishlist.has(id)) {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Save to wishlist');
      }
    });

    // Render Wishlist modal items
    const container = document.getElementById('wishlist-items-container');
    if (!container) return;

    if (count === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 10px;">
          <p style="font-size: 1rem; color: var(--color-slate-muted);">You haven't saved any lashes to your favourites yet.</p>
          <a href="#collection" class="btn btn-secondary" style="margin-top: 14px;" id="wishlist-browse-btn">Explore Lash Edit</a>
        </div>
      `;
      document.getElementById('wishlist-browse-btn')?.addEventListener('click', closeWishlist);
      return;
    }

    const savedProducts = products.filter(p => state.wishlist.has(p.id));
    container.innerHTML = savedProducts.map(p => `
      <div class="search-result-item" style="border: 1px solid var(--color-border); border-radius: var(--radius-md);">
        <img src="${p.images.primary}" alt="${p.name}" class="search-result-img">
        <div class="search-result-info">
          <div class="search-result-title">${p.name}</div>
          <div class="search-result-category">${p.styleNum} &bull; ${formatPrice(p.priceGBP)}</div>
        </div>
        <button class="btn-add-cart" data-id="${p.id}" style="padding: 6px 14px; font-size: 0.75rem;">
          Move to Bag
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        addToCart(id);
        state.wishlist.delete(id);
        updateWishlistUI();
      });
    });
  };

  const toggleWishlist = (productId, btnEl) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (state.wishlist.has(productId)) {
      state.wishlist.delete(productId);
      showToast(`Removed ${product.name} from favourites`, '♡', true);
    } else {
      state.wishlist.add(productId);
      showToast(`Saved ${product.name} to favourites`, '♥', true);
      triggerBadgePulse(wishlistCountBadge);
    }

    updateWishlistUI();
  };

  const openWishlist = () => {
    updateWishlistUI();
    wishlistModal.classList.add('open');
    wishlistBackdrop.classList.add('open');
    wishlistModal.setAttribute('aria-hidden', 'false');
    wishlistBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeWishlist = () => {
    wishlistModal.classList.remove('open');
    wishlistBackdrop.classList.remove('open');
    wishlistModal.setAttribute('aria-hidden', 'true');
    wishlistBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.wishlist-trigger').forEach(trigger => {
    trigger.addEventListener('click', openWishlist);
  });
  wishlistClose?.addEventListener('click', closeWishlist);
  wishlistBackdrop?.addEventListener('click', closeWishlist);

  // --- Search Functionality ---
  const searchModal = document.getElementById('search-modal');
  const searchBackdrop = document.getElementById('search-backdrop');
  const searchTrigger = document.getElementById('search-trigger');
  const searchClose = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('search-input');
  const searchResultsList = document.getElementById('search-results-list');
  const searchClearBtn = document.getElementById('search-clear-btn');

  const openSearch = () => {
    searchModal.classList.add('open');
    searchBackdrop.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    searchBackdrop.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput?.focus(), 100);
    document.body.style.overflow = 'hidden';
  };

  const closeSearch = () => {
    searchModal.classList.remove('open');
    searchBackdrop.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    searchBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  searchTrigger?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  searchBackdrop?.addEventListener('click', closeSearch);

  searchInput?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (term.length > 0) {
      searchClearBtn.style.display = 'block';
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.styleNum.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.shortDesc.toLowerCase().includes(term) ||
        p.specs.some(s => s.toLowerCase().includes(term))
      );

      if (matches.length === 0) {
        searchResultsList.innerHTML = `
          <div style="text-align: center; padding: 24px; color: var(--color-slate-muted);">
            No matching styles found for "${term}". Try searching "Naturale", "Sensitive", or "Multipack".
          </div>
        `;
      } else {
        searchResultsList.innerHTML = matches.map(m => `
          <div class="search-result-item" data-id="${m.id}">
            <img src="${m.images.primary}" alt="${m.name}" class="search-result-img">
            <div class="search-result-info">
              <div class="search-result-title">${m.name}</div>
              <div class="search-result-category">${m.styleNum} &bull; ${m.specs[0]}</div>
            </div>
            <div class="search-result-price">${formatPrice(m.priceGBP)}</div>
          </div>
        `).join('');

        searchResultsList.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const id = parseInt(item.getAttribute('data-id'), 10);
            closeSearch();
            openQuickViewModal(id);
          });
        });
      }
    } else {
      searchClearBtn.style.display = 'none';
      searchResultsList.innerHTML = '';
    }
  });

  searchClearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.style.display = 'none';
    searchResultsList.innerHTML = '';
    searchInput.focus();
  });

  document.querySelectorAll('.search-tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const term = chip.getAttribute('data-search-term');
      if (searchInput) {
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
      }
    });
  });

  // --- Video Modal & Simulated Video Player ---
  const videoModal = document.getElementById('video-modal');
  const videoBackdrop = document.getElementById('video-backdrop');
  const videoModalClose = document.getElementById('video-modal-close');
  const simulatedVideo = document.getElementById('simulated-video');
  const videoBgFrame = document.getElementById('video-bg-frame');
  const videoModalTitle = document.getElementById('video-modal-title');
  const videoSpeakerTag = document.getElementById('video-speaker-tag');
  const videoCaptionText = document.getElementById('video-caption-text');
  const videoCenterToggle = document.getElementById('video-center-toggle');
  const videoBtnPlay = document.getElementById('video-btn-play');
  const videoSeekFill = document.getElementById('video-seek-fill');
  const videoSoundToggle = document.getElementById('video-sound-toggle');
  let isVideoPlaying = false;
  let videoProgressInterval = null;
  let videoProgress = 15;

  const openVideo = (reelKey = 'founder') => {
    const data = videoReels[reelKey] || videoReels.founder;

    if (videoBgFrame) videoBgFrame.style.backgroundImage = `url('${data.bgImg}')`;
    if (videoModalTitle) videoModalTitle.textContent = data.title;
    if (videoSpeakerTag) videoSpeakerTag.innerHTML = data.speaker;
    if (videoCaptionText) videoCaptionText.textContent = data.caption;

    videoProgress = 15;
    if (videoSeekFill) videoSeekFill.style.width = `${videoProgress}%`;

    videoModal.classList.add('open');
    videoBackdrop.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    videoBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    startSimulatedPlayback();
  };

  const closeVideo = () => {
    pauseSimulatedPlayback();
    videoModal.classList.remove('open');
    videoBackdrop.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const startSimulatedPlayback = () => {
    isVideoPlaying = true;
    simulatedVideo?.classList.add('playing');
    if (videoBtnPlay) videoBtnPlay.textContent = '❚❚';
    if (videoCenterToggle) videoCenterToggle.style.opacity = '0';

    clearInterval(videoProgressInterval);
    videoProgressInterval = setInterval(() => {
      if (videoProgress < 100) {
        videoProgress += 0.8;
        if (videoSeekFill) videoSeekFill.style.width = `${videoProgress}%`;
      } else {
        pauseSimulatedPlayback();
      }
    }, 500);
  };

  const pauseSimulatedPlayback = () => {
    isVideoPlaying = false;
    simulatedVideo?.classList.remove('playing');
    if (videoBtnPlay) videoBtnPlay.textContent = '▶';
    if (videoCenterToggle) videoCenterToggle.style.opacity = '1';
    clearInterval(videoProgressInterval);
  };

  const toggleVideoPlayback = () => {
    if (isVideoPlaying) {
      pauseSimulatedPlayback();
    } else {
      startSimulatedPlayback();
    }
  };

  videoCenterToggle?.addEventListener('click', toggleVideoPlayback);
  videoBtnPlay?.addEventListener('click', toggleVideoPlayback);

  videoSoundToggle?.addEventListener('click', () => {
    const isMuted = videoSoundToggle.textContent === '🔇';
    videoSoundToggle.textContent = isMuted ? '🔊' : '🔇';
    showToast(isMuted ? 'Audio unmuted' : 'Audio muted');
  });

  videoModalClose?.addEventListener('click', closeVideo);
  videoBackdrop?.addEventListener('click', closeVideo);

  // Trigger video from buttons
  document.querySelectorAll('.video-play-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-video-src') || 'founder';
      openVideo(src);
    });
  });

  // Reel cards trigger
  document.querySelectorAll('.reel-card').forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-video-id');
      openVideo(videoId);
    });
  });

  // --- Currency Selector ---
  const currencySelect = document.getElementById('currency-select');
  const updateCurrencyDisplays = () => {
    document.querySelectorAll('.free-shipping-threshold').forEach(el => {
      el.textContent = formatPrice(state.freeShippingThresholdGBP);
    });
  };

  currencySelect?.addEventListener('change', (e) => {
    state.currency = e.target.value;
    renderProducts(state.activeFilter);
    updateCartUI();
    updateCurrencyDisplays();
    showToast(`Currency updated to ${state.currency} (${state.currencyRates[state.currency].symbol})`);
  });

  // --- Educational FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger?.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Accessible toggle
      trigger.setAttribute('aria-expanded', !isExpanded);
      content.hidden = isExpanded;
      item.classList.toggle('active', !isExpanded);
    });
  });

  // --- Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');

  mobileToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking any nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('open');
      mobileToggle?.classList.remove('active');
      mobileToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Sticky Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- Newsletter Form Submission ---
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterBtn = document.getElementById('newsletter-btn');

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (!emailInput || !emailInput.value) return;

    const originalBtn = newsletterBtn.innerHTML;
    newsletterBtn.disabled = true;
    newsletterBtn.innerHTML = `<span>Joining...</span>`;

    setTimeout(() => {
      newsletterForm.style.display = 'none';
      if (newsletterSuccess) newsletterSuccess.hidden = false;
      showToast('Welcome to the C-Lash Circle! 10% voucher code: WELCOME10', '🎉');
    }, 700);
  });

  // --- Care Guide PDF Download Simulator ---
  const downloadGuideBtn = document.getElementById('download-guide-btn');
  downloadGuideBtn?.addEventListener('click', () => {
    const orig = downloadGuideBtn.innerHTML;
    downloadGuideBtn.innerHTML = `<span>Preparing Oncology & Alopecia Guide...</span>`;
    downloadGuideBtn.disabled = true;

    setTimeout(() => {
      downloadGuideBtn.innerHTML = `<span>✓ Care Guide Downloaded!</span>`;
      showToast('Your free Oncology & Alopecia Lash Care Guide has downloaded!', '📖');
      setTimeout(() => {
        downloadGuideBtn.innerHTML = orig;
        downloadGuideBtn.disabled = false;
      }, 3000);
    }, 1000);
  });

  // --- Mobile Drawer Extra Controls ---
  const mobileNavClose = document.getElementById('mobile-nav-close');
  mobileNavClose?.addEventListener('click', () => {
    mainNav?.classList.remove('open');
    mobileToggle?.classList.remove('active');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  });

  const mobileCurrencySelect = document.getElementById('mobile-currency-select');
  mobileCurrencySelect?.addEventListener('change', (e) => {
    state.currency = e.target.value;
    if (currencySelect) currencySelect.value = state.currency;
    renderProducts(state.activeFilter);
    updateCartUI();
    updateCurrencyDisplays();
    showToast(`Currency updated to ${state.currency} (${state.currencyRates[state.currency].symbol})`);
  });

  // --- Interactive Before & After Transformation Slider ---
  const baSlider = document.getElementById('ba-slider');
  const baBeforeLayer = document.getElementById('ba-before-layer');
  const baHandle = document.getElementById('ba-handle');
  const btnShowAfter = document.getElementById('btn-show-after');
  const btnShowSplit = document.getElementById('btn-show-split');
  const btnShowBefore = document.getElementById('btn-show-before');

  let isDraggingSlider = false;

  const setSplitPosition = (percent) => {
    const clamped = Math.max(0, Math.min(100, percent));
    if (baBeforeLayer) baBeforeLayer.style.width = `${clamped}%`;
    if (baHandle) {
      baHandle.style.left = `${clamped}%`;
      baHandle.setAttribute('aria-valuenow', Math.round(clamped));
    }
  };

  const updateSplitFromPointer = (clientX) => {
    if (!baSlider) return;
    const rect = baSlider.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const pct = (offsetX / rect.width) * 100;
    setSplitPosition(pct);
  };

  baSlider?.addEventListener('mousedown', (e) => {
    isDraggingSlider = true;
    updateSplitFromPointer(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDraggingSlider) return;
    updateSplitFromPointer(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDraggingSlider = false;
  });

  // Touch event support for smartphones and tablets
  baSlider?.addEventListener('touchstart', (e) => {
    isDraggingSlider = true;
    if (e.touches && e.touches[0]) updateSplitFromPointer(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDraggingSlider) return;
    if (e.touches && e.touches[0]) updateSplitFromPointer(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDraggingSlider = false;
  });

  // Slider Quick Buttons
  const sliderBtns = [btnShowAfter, btnShowSplit, btnShowBefore];
  const setSliderBtnActive = (target) => {
    sliderBtns.forEach(b => b?.classList.remove('active'));
    target?.classList.add('active');
  };

  btnShowAfter?.addEventListener('click', () => {
    setSplitPosition(0);
    setSliderBtnActive(btnShowAfter);
  });

  btnShowSplit?.addEventListener('click', () => {
    setSplitPosition(50);
    setSliderBtnActive(btnShowSplit);
  });

  btnShowBefore?.addEventListener('click', () => {
    setSplitPosition(100);
    setSliderBtnActive(btnShowBefore);
  });

  // --- Lash Matchmaker Quiz System ---
  const quizModal = document.getElementById('quiz-modal');
  const quizBackdrop = document.getElementById('quiz-backdrop');
  const quizClose = document.getElementById('quiz-modal-close');
  const quizCardBody = document.getElementById('quiz-card-body');
  const quizCurrentStep = document.getElementById('quiz-current-step');
  const quizProgressBar = document.getElementById('quiz-progress-bar');

  let currentQuizStep = 1;
  const quizAnswers = {
    journey: null,
    desiredLook: null,
    lidShape: null
  };

  const quizQuestions = [
    {
      step: 1,
      title: "Where are you currently on your lash journey?",
      subtitle: "This helps us select the gentlest silicone adhesive band dynamics for your eyelid.",
      options: [
        {
          key: "chemo",
          icon: "🩺",
          title: "Active or Post-Chemotherapy",
          desc: "Eyelids are tender, delicate, or lashes have completely shed."
        },
        {
          key: "alopecia",
          icon: "🌸",
          title: "Alopecia or Trichotillomania",
          desc: "Bare eyelids requiring ultra-stable skin-adhesion without hair anchors."
        },
        {
          key: "thinning",
          icon: "✨",
          title: "Natural Thinning & Sensitive Skin",
          desc: "Standard glues sting or tear at fragile natural hairs."
        },
        {
          key: "first_time",
          icon: "👁️",
          title: "First-Time False Lash Wearer",
          desc: "Want an effortless, mistake-free daily beauty solution."
        }
      ]
    },
    {
      step: 2,
      title: "What finish or aesthetic makes you feel most like yourself?",
      subtitle: "Choose the density and flutter style that fits your comfort level.",
      options: [
        {
          key: "natural",
          icon: "🌿",
          title: "Subtle Everyday Natural",
          desc: "Soft wispy definition that recreates authentic, natural eyelashes."
        },
        {
          key: "lengthening",
          icon: "💫",
          title: "Open & Elongated Lift",
          desc: "Tapered outer tips designed to visually open hooded or tired eyes."
        },
        {
          key: "volume",
          icon: "🌙",
          title: "Soft Dimensional Volume",
          desc: "Criss-cross layered depth for evening occasions without heavy eyelid weight."
        }
      ]
    },
    {
      step: 3,
      title: "What is your eye shape and band preference?",
      subtitle: "Ensures the silicone strip hugs your natural eye curvature straight out of the box.",
      options: [
        {
          key: "standard",
          icon: "👁️",
          title: "Standard Almond / Oval Eyelid",
          desc: "Full standard band length with flexible contouring."
        },
        {
          key: "petite",
          icon: "✂️",
          title: "Petite, Hooded, or Smaller Eyes",
          desc: "Pre-tailored shorter band width — absolutely zero scissor trimming needed."
        },
        {
          key: "kit",
          icon: "🎁",
          title: "Complete Starter Care Kit",
          desc: "Want to try multiple styles plus extra adhesive and precision wand."
        }
      ]
    }
  ];

  const renderQuizStep = (stepNum) => {
    currentQuizStep = stepNum;
    if (quizCurrentStep) quizCurrentStep.textContent = stepNum;
    if (quizProgressBar) quizProgressBar.style.width = `${(stepNum / 3) * 100}%`;

    const q = quizQuestions.find(item => item.step === stepNum);
    if (!q || !quizCardBody) return;

    quizCardBody.innerHTML = `
      <h3 class="quiz-question-title">${q.title}</h3>
      <p class="quiz-question-sub">${q.subtitle}</p>
      <div class="quiz-options-grid">
        ${q.options.map(opt => `
          <button class="quiz-option-btn" data-key="${opt.key}">
            <span class="quiz-option-icon">${opt.icon}</span>
            <div class="quiz-option-text">
              <span class="quiz-option-title">${opt.title}</span>
              <span class="quiz-option-desc">${opt.desc}</span>
            </div>
            <span class="quiz-option-arrow">→</span>
          </button>
        `).join('')}
      </div>
    `;

    quizCardBody.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-key');
        if (stepNum === 1) quizAnswers.journey = val;
        if (stepNum === 2) quizAnswers.desiredLook = val;
        if (stepNum === 3) quizAnswers.lidShape = val;

        if (stepNum < 3) {
          renderQuizStep(stepNum + 1);
        } else {
          renderQuizResult();
        }
      });
    });
  };

  const renderQuizResult = () => {
    if (quizProgressBar) quizProgressBar.style.width = `100%`;
    if (!quizCardBody) return;

    // Match logic
    let matchedProduct;
    if (quizAnswers.lidShape === 'kit') {
      matchedProduct = products.find(p => p.id === 6); // Triple Multipack
    } else if (quizAnswers.lidShape === 'petite') {
      matchedProduct = products.find(p => p.id === 4); // Petite Contour
    } else if (quizAnswers.desiredLook === 'lengthening') {
      matchedProduct = products.find(p => p.id === 2); // Lengthening
    } else if (quizAnswers.desiredLook === 'volume') {
      matchedProduct = products.find(p => p.id === 3); // Soft Volume
    } else {
      matchedProduct = products.find(p => p.id === 1); // Naturale No. 101
    }

    quizCardBody.innerHTML = `
      <div class="quiz-result-card">
        <span class="quiz-result-pill">✦ YOUR PERFECT CLINICAL MATCH</span>
        <h3 class="quiz-result-title">We Recommend: ${matchedProduct.name}</h3>
        <p class="quiz-result-summary">
          Based on your eyelid profile, our patented silicone band will provide safe all-day adhesion without disturbing recovering follicles or pulling on sensitive skin.
        </p>

        <div class="quiz-match-box">
          <img src="${matchedProduct.images.primary}" alt="${matchedProduct.name}" class="quiz-match-img">
          <div>
            <div class="quiz-match-name">${matchedProduct.name} (${matchedProduct.styleNum})</div>
            <div class="quiz-match-price">${formatPrice(matchedProduct.priceGBP)}</div>
            <ul class="quiz-match-bullets">
              <li>✓ Includes latex-free gentle adhesive</li>
              <li>✓ Patented skin-contact silicone band</li>
              <li>✓ Up to 10 reusable wears</li>
            </ul>
          </div>
        </div>

        <div class="quiz-actions-row">
          <button class="btn btn-primary" id="btn-quiz-add-cart">
            <span>Add Matched Lash to Bag &bull; ${formatPrice(matchedProduct.priceGBP)}</span>
          </button>
          <button class="btn btn-secondary" id="btn-quiz-retake">
            Retake Quiz
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-quiz-add-cart')?.addEventListener('click', () => {
      addToCart(matchedProduct.id, 1);
      closeQuizModal();
    });

    document.getElementById('btn-quiz-retake')?.addEventListener('click', () => {
      renderQuizStep(1);
    });
  };

  const openQuizModal = () => {
    renderQuizStep(1);
    quizModal?.classList.add('open');
    quizBackdrop?.classList.add('open');
    quizModal?.setAttribute('aria-hidden', 'false');
    quizBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeQuizModal = () => {
    quizModal?.classList.remove('open');
    quizBackdrop?.classList.remove('open');
    quizModal?.setAttribute('aria-hidden', 'true');
    quizBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  quizClose?.addEventListener('click', closeQuizModal);
  quizBackdrop?.addEventListener('click', closeQuizModal);

  document.querySelectorAll('.quiz-open-trigger, #hero-quiz-trigger, #mobile-quiz-trigger').forEach(btn => {
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      mainNav?.classList.remove('open');
      mobileToggle?.classList.remove('active');
      openQuizModal();
    });
  });

  // --- Hero Interactive Lash Style Switcher ---
  const heroDynamicImg = document.getElementById('hero-dynamic-img');
  const heroSwitchBtns = document.querySelectorAll('.hero-switch-btn');
  const heroMiniProduct = document.querySelector('.hero-mini-product');

  const heroStyleData = {
    naturale: {
      img: "images/clash-naturals.jpg",
      title: "Eylure C-Lash Naturals",
      quote: "“I cried when I looked in the mirror. My face felt complete again.”",
      author: "— Rachel K., Oncology Patient"
    },
    lengthening: {
      img: "images/clash-lengthening.jpg",
      title: "Eylure C-Lash Lengthening",
      quote: "“The delicate lift visually opened my eyes without pulling on my lids.”",
      author: "— Amanda P., Alopecia UK Member"
    },
    volume: {
      img: "images/clash-volume.jpg",
      title: "Eylure C-Lash Volume",
      quote: "“Gave me gorgeous dimension for my daughter's wedding. Zero irritation.”",
      author: "— Helen S., Breast Cancer Survivor"
    }
  };

  heroSwitchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      heroSwitchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const style = btn.getAttribute('data-style');
      const data = heroStyleData[style];
      if (!data) return;

      if (heroDynamicImg) {
        heroDynamicImg.style.opacity = '0.3';
        heroDynamicImg.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          heroDynamicImg.src = data.img;
          heroDynamicImg.style.opacity = '1';
        }, 180);
      }

      if (heroMiniProduct) {
        heroMiniProduct.querySelector('.mini-title').textContent = data.title;
        heroMiniProduct.querySelector('.mini-quote').textContent = data.quote;
        heroMiniProduct.querySelector('.mini-author').textContent = data.author;
      }
    });
  });

  // --- Verified Patient Reviews Data & Filter ---
  const patientReviews = [
    {
      id: 1,
      author: "Rachel K.",
      category: "chemo",
      conditionLabel: "Chemo Patient",
      conditionClass: "chemo",
      rating: 5,
      comfortScore: "10/10 Gentle",
      title: "I cried tears of relief looking in the mirror",
      body: "Losing my lashes during breast cancer treatments made me lose my identity. Normal false lashes tore at my bare skin and wouldn’t stay flat. C-Lash stayed put for 12 straight hours at a family christening. I felt like myself again.",
      style: "C-Lash Naturale No. 101",
      date: "3 days ago"
    },
    {
      id: 2,
      author: "Amanda P.",
      category: "alopecia",
      conditionLabel: "Alopecia Totalis",
      conditionClass: "alopecia",
      rating: 5,
      comfortScore: "10/10 Gentle",
      title: "Finally, lashes that don’t flip or pull off in the wind",
      body: "I've had Alopecia for 9 years and have tried every magnet, glue, and strap under the sun. The wider silicone skin band on C-Lash creates a flat vacuum-like seal on bare eyelid skin. It is truly life-changing.",
      style: "C-Lash Lengthening No. 110",
      date: "1 week ago"
    },
    {
      id: 3,
      author: "Yasmin B.",
      category: "chemo",
      conditionLabel: "Chemo Recovery",
      conditionClass: "chemo",
      rating: 5,
      comfortScore: "10/10 Gentle",
      title: "Protected my regrowing peach fuzz!",
      body: "When my chemotherapy ended, fragile new hairs started sprouting. I was terrified traditional glue would rip them out. C-Lash peeled away in the evening with warm water without tugging a single follicle.",
      style: "Triple Recovery Multipack",
      date: "2 weeks ago"
    },
    {
      id: 4,
      author: "Dr. Fiona M.",
      category: "chemo",
      conditionLabel: "GP & Survivor",
      conditionClass: "chemo",
      rating: 5,
      comfortScore: "9.9/10 Gentle",
      title: "Clinically sound biocompatible design",
      body: "As a General Practitioner who went through cancer myself, I inspect cosmetics with scrutiny. The hypoallergenic latex-free adhesive and biocompatible silicone strip minimize all risks of blepharitis or contact dermatitis.",
      style: "C-Lash Naturale No. 101",
      date: "3 weeks ago"
    },
    {
      id: 5,
      author: "Chloe D.",
      category: "sensitive",
      conditionLabel: "Sensitive Eyelids",
      conditionClass: "sensitive",
      rating: 5,
      comfortScore: "10/10 Gentle",
      title: "No more stinging or watery red eyes",
      body: "I suffer from eyelid eczema and sensitive watery eyes. Every other lash glue burns. The gentle chamomile-infused C-Lash glue feels soothing and the flexible silicone band doesn't poke the inner corners at all.",
      style: "C-Lash Petite Contour No. 105",
      date: "1 month ago"
    },
    {
      id: 6,
      author: "Helen S.",
      category: "alopecia",
      conditionLabel: "Trichotillomania",
      conditionClass: "alopecia",
      rating: 5,
      comfortScore: "10/10 Gentle",
      title: "Soft glamorous volume without heavy weight",
      body: "I wore the Soft Volume No. 120 for my daughter's wedding. It was lightweight, dignified, and gave my eyes the exact soft focus framing I had missed for years. Thank you Codilia for inventing this!",
      style: "C-Lash Soft Volume No. 120",
      date: "1 month ago"
    }
  ];

  const renderReviews = (filterCategory = 'all') => {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    const filtered = filterCategory === 'all'
      ? patientReviews
      : patientReviews.filter(r => r.category === filterCategory);

    grid.innerHTML = filtered.map(rev => `
      <div class="review-card">
        <div class="review-header">
          <div class="review-author-name">
            <span>${rev.author}</span>
            <svg viewBox="0 0 20 20" fill="currentColor" class="verified-icon" title="Verified Patient Buyer">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
          </div>
          <span class="condition-pill ${rev.conditionClass}">${rev.conditionLabel}</span>
        </div>

        <div class="review-stars-row">
          <span class="stars">${'★'.repeat(rev.rating)}</span>
          <span class="review-comfort-tag">${rev.comfortScore}</span>
        </div>

        <h4 class="review-card-title">${rev.title}</h4>
        <p class="review-card-body">“${rev.body}”</p>

        <div class="review-card-footer">
          <span class="review-style-tag">${rev.style}</span>
          <span class="review-date">${rev.date}</span>
        </div>
      </div>
    `).join('');
  };

  // Review Filter Tabs Click Listener
  document.querySelectorAll('.review-filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.review-filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter');
      const grid = document.getElementById('reviews-grid');
      if (grid) {
        grid.style.opacity = '0';
        grid.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          renderReviews(cat);
          grid.style.opacity = '1';
        }, 200);
      }
    });
  });

  // --- Write a Review Modal ---
  const reviewModal = document.getElementById('review-modal');
  const reviewBackdrop = document.getElementById('review-backdrop');
  const reviewModalClose = document.getElementById('review-modal-close');
  const openReviewModalBtn = document.getElementById('open-review-modal-btn');
  const reviewForm = document.getElementById('review-form');
  let selectedReviewStars = 5;

  const openReviewModal = () => {
    reviewModal?.classList.add('open');
    reviewBackdrop?.classList.add('open');
    reviewModal?.setAttribute('aria-hidden', 'false');
    reviewBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeReviewModal = () => {
    reviewModal?.classList.remove('open');
    reviewBackdrop?.classList.remove('open');
    reviewModal?.setAttribute('aria-hidden', 'true');
    reviewBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openReviewModalBtn?.addEventListener('click', openReviewModal);
  reviewModalClose?.addEventListener('click', closeReviewModal);
  reviewBackdrop?.addEventListener('click', closeReviewModal);

  // Interactive Star Selector inside Review Modal
  const starButtons = document.querySelectorAll('.star-pick');
  starButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const starVal = parseInt(btn.getAttribute('data-star'), 10);
      selectedReviewStars = starVal;
      starButtons.forEach(s => {
        const val = parseInt(s.getAttribute('data-star'), 10);
        s.classList.toggle('active', val <= starVal);
      });
    });
  });

  // Review Form Submit Handler
  reviewForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('review-author')?.value.trim() || 'Community Member';
    const condition = document.getElementById('review-condition')?.value || 'chemo';
    const conditionText = document.getElementById('review-condition')?.selectedOptions[0]?.text || 'Patient';
    const product = document.getElementById('review-product')?.value || 'C-Lash Naturale No. 101';
    const headline = document.getElementById('review-headline')?.value.trim() || 'Restored my expression!';
    const body = document.getElementById('review-body')?.value.trim() || 'Gentle and stays in place all day.';

    // Prepend to reviews list
    patientReviews.unshift({
      id: Date.now(),
      author: author,
      category: condition,
      conditionLabel: conditionText.split(' ')[0] + ' Journey',
      conditionClass: condition === 'chemo' ? 'chemo' : condition === 'alopecia' ? 'alopecia' : 'sensitive',
      rating: selectedReviewStars,
      comfortScore: "10/10 Gentle",
      title: headline,
      body: body,
      style: product,
      date: "Just now"
    });

    renderReviews('all');
    closeReviewModal();
    showToast('Thank you! Your verified patient review has been published.', '✨');
    reviewForm.reset();
  });

  // --- Same-Day Dispatch Countdown Timer ---
  const initDispatchCountdown = () => {
    const el = document.getElementById('dispatch-countdown');
    if (!el) return;

    // Simulate countdown to 3:00 PM Royal Mail cutoff
    let remainingMinutes = 134; // 2h 14m
    setInterval(() => {
      if (remainingMinutes > 0) {
        remainingMinutes -= 1;
        const hrs = Math.floor(remainingMinutes / 60);
        const mins = remainingMinutes % 60;
        el.textContent = `${hrs}h ${mins < 10 ? '0' : ''}${mins}m`;
      }
    }, 60000);
  };

  // --- Keyboard Accessibility: ESC closes all modals/drawers ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeQuickView();
      closeVideo();
      closeSearch();
      closeWishlist();
      closeQuizModal();
      closeReviewModal();
    }
  });

  // --- Initial Render ---
  updateCurrencyDisplays();
  renderProducts('all');
  renderReviews('all');
  initDispatchCountdown();
  updateCartUI();
  updateWishlistUI();
});
