(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var nav = document.querySelector('.nav');
  var navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close menu when a link is tapped
    document.querySelectorAll('.nav-panel a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add('is-visible');
            }, i * 90);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Portfolio: build 11 reel slots with real videos ----------
     Put your 11 files in a "videos" folder next to index.html and list
     their filenames below, in order. Each slot gets a <video> tag
     automatically. Add poster="thumb.jpg" per item if you have
     thumbnail stills — optional. */
  var reelVideos = [
    'videos/reel-01.mp4',
    'videos/reel-02.mp4',
    'videos/reel-03.mp4',
    'videos/reel-04.mp4',
    'videos/reel-05.mp4',
    'videos/reel-06.mp4',
    'videos/reel-07.mp4',
    'videos/reel-08.mp4',
    'videos/reel-09.mp4',
    'videos/reel-10.mp4',
    'videos/reel-11.mp4'
  ];
  var REEL_COUNT = reelVideos.length;
  var reelGrid = document.getElementById('reelGrid');
  if (reelGrid) {
    var frag = document.createDocumentFragment();
    for (var i = 1; i <= REEL_COUNT; i++) {
      var num = String(i).padStart(2, '0');
      var slot = document.createElement('div');
      slot.className = 'reel-slot';
      slot.innerHTML =
        '<span class="reel-num">' + num + '</span>' +
        '<video src="' + reelVideos[i - 1] + '" muted loop autoplay playsinline controls preload="auto"></video>';
      frag.appendChild(slot);
    }
    reelGrid.appendChild(frag);

    // Explicit play() call — some browsers don't honor the autoplay
    // attribute on <video> elements inserted dynamically via JS.
    reelGrid.querySelectorAll('video').forEach(function (video) {
      video.play().catch(function () {}); // ignore autoplay-block errors silently
    });
  }

  /* ---------- Testimonials data (from Extra Lemon master copy) ---------- */
  var testimonials = [
    {
      quote: "Woke up to 14 fully qualified inbound leads in the DMs after launching the new script framework with the ManyChat automation loop — 3 of them booked straight into the calendar the same afternoon.",
      name: "Verified Client",
      role: "Content & automation launch"
    },
    {
      quote: "I used to stare at a blank Google Doc for hours. Now I open the content calendar, film 20 videos in one afternoon using their tension hooks, and walk away. It's a complete client acquisition machine running in the background.",
      name: "Verified Client",
      role: "Scriptwriting workflow"
    },
    {
      quote: "Extra Lemon completely restructured our funnel — fixed our messaging, deployed automated DM lead scoring, and tied it into our email nurture. Inbound pipeline revenue grew by 240% in under 90 days.",
      name: "Verified Client",
      role: "Funnel & automation"
    },
    {
      quote: "Their 5-step script framework — Hook, Context, Tension, Pivot, Payoff — fundamentally changed how we communicate with our market. People stay until the very last second now.",
      name: "Verified Client",
      role: "Script framework"
    },
    {
      quote: "The ConvertKit sequence went live yesterday. 42 people already downloaded the lead magnet from the Reel automation, and the system paid for the entire month's retainer in under 48 hours.",
      name: "Verified Client",
      role: "Lead magnet & email"
    },
    {
      quote: "We implemented their retention style and stripped out the noisy text overlays. Average watch time went from 3 seconds to 22 seconds on the very first drop.",
      name: "Verified Client",
      role: "Content Surgery session"
    },
    {
      quote: "We've hired three different editors this year and none of them understood our brand. Extra Lemon nailed our messaging on day one.",
      name: "Verified Client",
      role: "Scripts & edits"
    },
    {
      quote: "The Creative Project Manager had the strategy nailed from day one — mapped our content pillars, scripted the hooks, and brought real efficiency to our lead generation.",
      name: "Verified Client",
      role: "Consulting firm partnership"
    }
  ];

  var track = document.getElementById('marqueeTrack');
  if (track) {
    function cardHTML(t) {
      var initials = 'EL';
      return (
        '<article class="t-card">' +
          '<p class="t-quote">' + t.quote + '</p>' +
          '<div class="t-meta">' +
            '<span class="t-avatar">' + initials + '</span>' +
            '<div>' +
              '<p class="t-name">' + t.name + '</p>' +
              '<p class="t-role">' + t.role + '</p>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }
    // render twice back-to-back for a seamless CSS-driven loop
    var html = testimonials.map(cardHTML).join('');
    track.innerHTML = html + html;
  }

})();