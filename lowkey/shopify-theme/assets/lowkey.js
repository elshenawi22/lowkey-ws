/* ==============================================
   LOWKEY — Shopify Theme JavaScript
   ============================================== */

document.addEventListener('DOMContentLoaded', function() {

  // Mark JS is working — enables reveal animations
  document.body.classList.add('js-ready');

  /* --- Scroll Reveal --- */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('show');
          obs.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    var els = document.querySelectorAll('.rv, .rv-fade, .rv-scale');
    for (var i = 0; i < els.length; i++) obs.observe(els[i]);
  } else {
    // Fallback: show everything
    var els = document.querySelectorAll('.rv, .rv-fade, .rv-scale');
    for (var i = 0; i < els.length; i++) els[i].classList.add('show');
  }

  /* --- Navbar --- */
  var nav = document.getElementById('nav');
  var lastY = 0;
  if (nav) {
    window.addEventListener('scroll', function() {
      var y = window.scrollY;
      if (y > 60) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
      if (y > lastY && y > 200) nav.classList.add('hidden'); else nav.classList.remove('hidden');
      lastY = y;
    }, { passive: true });
  }

  /* --- Menu --- */
  var ham = document.getElementById('ham');
  var menu = document.getElementById('menu');
  if (ham && menu) {
    ham.onclick = function() {
      var open = ham.classList.toggle('open');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    var links = menu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].onclick = function() {
        ham.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      };
    }
  }

  /* --- Theme Toggle --- */
  var isLight = localStorage.getItem('lowkey-theme') === 'light';
  if (isLight) document.documentElement.classList.add('light');

  var btns = document.querySelectorAll('.theme-btn');
  for (var i = 0; i < btns.length; i++) {
    (function(btn) {
      // Set initial icon
      var sun = btn.querySelector('.sun');
      var moon = btn.querySelector('.moon');
      if (sun && moon) {
        sun.style.display = isLight ? 'none' : 'block';
        moon.style.display = isLight ? 'block' : 'none';
      }
      btn.onclick = function() {
        var nowLight = document.documentElement.classList.toggle('light');
        localStorage.setItem('lowkey-theme', nowLight ? 'light' : 'dark');
        if (sun && moon) {
          sun.style.display = nowLight ? 'none' : 'block';
          moon.style.display = nowLight ? 'block' : 'none';
        }
      };
    })(btns[i]);
  }

  /* --- Hero Parallax --- */
  if (window.innerWidth > 768) {
    var heroWrap = document.querySelector('.hero__img-wrap');
    if (heroWrap) {
      document.addEventListener('mousemove', function(e) {
        var x = (e.clientX / window.innerWidth - 0.5) * 1.2;
        var y = (e.clientY / window.innerHeight - 0.5) * 1.2;
        heroWrap.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
    }
  }

  /* --- Cart --- */
  window.openCart = function() {
    var bg = document.getElementById('cart-bg');
    var panel = document.getElementById('cart-panel');
    if (bg) bg.classList.add('open');
    if (panel) panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeCart = function() {
    var bg = document.getElementById('cart-bg');
    var panel = document.getElementById('cart-panel');
    if (bg) bg.classList.remove('open');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.addToCart = function(variantId, qty) {
    qty = qty || 1;
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: qty })
    })
    .then(function(res) { return res.json(); })
    .then(function() { refreshCart(); openCart(); })
    .catch(function(e) { console.error(e); });
  };

  window.changeCartItem = function(key, qty) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    })
    .then(function() { refreshCart(); })
    .catch(function(e) { console.error(e); });
  };

  function refreshCart() {
    fetch('/cart.js')
    .then(function(res) { return res.json(); })
    .then(function(cart) {
      // Update counts
      var counts = document.querySelectorAll('.cart-count');
      for (var i = 0; i < counts.length; i++) counts[i].textContent = cart.item_count;

      var body = document.getElementById('cart-body');
      var foot = document.getElementById('cart-foot');
      if (!body) return;

      if (cart.item_count === 0) {
        body.innerHTML = '<div class="cart-empty"><p class="c-fg3" style="font-size:0.6875rem;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:1rem">Your bag is empty</p><button onclick="closeCart()" class="c-gold tap" style="font-size:0.625rem;letter-spacing:0.3em;text-transform:uppercase">Continue Shopping</button></div>';
        if (foot) foot.style.display = 'none';
      } else {
        var html = '';
        for (var i = 0; i < cart.items.length; i++) {
          var item = cart.items[i];
          var vt = item.variant_title !== 'Default Title' ? item.variant_title + ' · ' : '';
          html += '<div class="cart-item"><div class="cart-item__img"><img src="' + item.image + '" alt="' + item.title + '"></div><div class="cart-item__info"><div><p class="cart-item__name">' + item.product_title + '</p><p class="cart-item__meta">' + vt + 'Qty: ' + item.quantity + '</p></div><div class="cart-item__qty"><button onclick="changeCartItem(\'' + item.key + '\',' + (item.quantity - 1) + ')" class="tap">−</button><span>' + item.quantity + '</span><button onclick="changeCartItem(\'' + item.key + '\',' + (item.quantity + 1) + ')" class="tap">+</button></div><div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:0.5rem"><span class="cart-item__price">' + formatMoney(item.final_line_price) + '</span><button onclick="changeCartItem(\'' + item.key + '\',0)" class="cart-item__rm tap">Remove</button></div></div></div>';
        }
        body.innerHTML = html;
        if (foot) {
          foot.style.display = '';
          var totalEl = foot.querySelector('.cart-total span:last-child');
          if (totalEl) totalEl.textContent = formatMoney(cart.total_price);
        }
      }
    })
    .catch(function(e) { console.error(e); });
  }

  function formatMoney(cents) {
    return (Shopify && Shopify.currency && Shopify.currency.active)
      ? (cents / 100).toFixed(2) + ' ' + Shopify.currency.active
      : '$' + (cents / 100).toFixed(2);
  }

  // Refresh on load
  refreshCart();

  /* --- Product Size Selector --- */
  var sizeContainers = document.querySelectorAll('.pp__sizes');
  for (var i = 0; i < sizeContainers.length; i++) {
    (function(container) {
      container.onclick = function(e) {
        var btn = e.target.closest('.pp__size');
        if (!btn || btn.disabled) return;
        var all = container.querySelectorAll('.pp__size');
        for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
        btn.classList.add('active');
        var addBtn = container.closest('.pp__info').querySelector('.pp__add');
        if (addBtn) {
          addBtn.dataset.variant = btn.dataset.variant;
          addBtn.disabled = false;
          addBtn.textContent = 'Add to Bag — ' + btn.textContent.trim();
        }
      };
    })(sizeContainers[i]);
  }

  var addBtns = document.querySelectorAll('.pp__add');
  for (var i = 0; i < addBtns.length; i++) {
    (function(btn) {
      btn.onclick = function() {
        var vid = btn.dataset.variant;
        if (!vid || btn.disabled) return;
        btn.disabled = true;
        btn.textContent = 'Adding...';
        addToCart(parseInt(vid), 1);
        setTimeout(function() {
          btn.textContent = 'Added ✓';
          btn.classList.add('added');
          setTimeout(function() {
            btn.textContent = 'Add to Bag';
            btn.classList.remove('added');
            btn.disabled = false;
          }, 2000);
        }, 500);
      };
    })(addBtns[i]);
  }

});
