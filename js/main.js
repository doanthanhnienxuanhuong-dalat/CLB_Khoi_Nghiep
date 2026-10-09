/**
 * CLB THANH NIÊN KHỞI NGHIỆP - PHƯỜNG XUÂN HƯƠNG - ĐÀ LẠT
 * ENTERPRISE INTERACTIVE ENGINE (Vanilla ES6+ & GSAP)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarAndDrawer();
  initGSAPAnimations();
  initHeroParallax();
  initSpotlightEffect();
  initStatsCounter();
  initProjectFilter();
  initModals();
  initFormHandling();
  initResourceDownloads();
  initLoanCalculator();
  initCopyEmail();
  initBackToTop();
  initFloatingDock();
});

/* ==========================================================================
   1. NAVBAR & ENTERPRISE MOBILE DRAWER
   ========================================================================== */
function initNavbarAndDrawer() {
  const header = document.querySelector('.site-header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const toggleDrawer = (open) => {
    if (navMenu && navBackdrop && hamburgerBtn) {
      const shouldOpen = open !== undefined ? open : !navMenu.classList.contains('open');
      if (shouldOpen) {
        navMenu.classList.add('open');
        navBackdrop.classList.add('open');
        hamburgerBtn.innerHTML = '<i class="ri-close-line"></i>';
        document.body.style.overflow = 'hidden';
      } else {
        navMenu.classList.remove('open');
        navBackdrop.classList.remove('open');
        hamburgerBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
        document.body.style.overflow = '';
      }
    }
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDrawer();
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleDrawer(false));
  }

  // Close drawer when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      
      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   2. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target') || 0;
      const countObj = { val: 0 };
      gsap.to(countObj, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          once: true
        },
        onUpdate: () => {
          counter.innerText = Math.floor(countObj.val);
        },
        onComplete: () => {
          counter.innerText = target;
        }
      });
    });
  } else {
    counters.forEach(counter => {
      counter.innerText = counter.getAttribute('data-target') || '0';
    });
  }
}

/* ==========================================================================
   3. STARTUP PROJECTS DATA (ĐÀ LẠT HIGH-TECH & TOURISM SPECIALTIES)
   ========================================================================== */
const projectsData = {
  1: {
    title: "Dâu Tây Thủy Canh & IoT Xuân Hương - Đà Lạt",
    founder: "Nguyễn Văn Hùng (26 tuổi) - Kỹ sư nông nghiệp ĐH Đà Lạt",
    category: "Nông nghiệp công nghệ cao",
    status: "Đang gọi vốn thiên thần (Angel Round)",
    target: "500.000.000 VNĐ",
    equity: "12% cổ phần",
    summary: "Hệ thống nhà màng trồng dâu tây giống Nhật & Bạch Tuyết ứng dụng châm phân tự động IoT, tưới nhỏ giọt Israel và quản lý sâu bệnh sinh học, đạt tiêu chuẩn GlobalGAP tại Phường Xuân Hương.",
    highlights: [
      "Quy mô hiện tại: 8.000m² nhà màng công nghệ cao tại P. Xuân Hương",
      "Sản lượng ổn định 1.5 tấn dâu cao cấp/tháng, cung cấp chuỗi siêu thị cao cấp",
      "Đạt giải Nhất 'Ý Tưởng Sáng Tạo Thanh Niên Khởi Nghiệp Đà Lạt 2025'",
      "Được Tỉnh Đoàn và Ngân hàng CSXH hỗ trợ vốn vay giải quyết việc làm"
    ]
  },
  2: {
    title: "Eco-Farmstay & Tour Canh Nông Xuân Hương",
    founder: "Trần Thị Mai Phương (24 tuổi) - Cử nhân Du lịch",
    category: "Du lịch bản địa",
    status: "Đã thương mại hóa - Đón khách liên tục",
    target: "350.000.000 VNĐ",
    equity: "10% cổ phần",
    summary: "Mô hình kết hợp du lịch trải nghiệm nông nghiệp: du khách tự tay thu hoạch dâu tây, hái atisô, thưởng trà thảo mộc và lưu trú homestay gỗ phong cách Đà Lạt thơ mộng, tạo việc làm cho 15 đoàn viên địa phương.",
    highlights: [
      "Đón hơn 1.800 lượt khách trải nghiệm sau 8 tháng vận hành",
      "Ký kết hợp tác cùng 18 hộ nông dân trẻ tại P. Xuân Hương",
      "Đánh giá 4.9/5 sao trên các nền tảng OTA và mạng xã hội"
    ]
  },
  3: {
    title: "Sàn Số OCOP & Hoa Tươi Đà Lạt 24/7",
    founder: "Lê Hoàng Nam (27 tuổi) - Kỹ sư phần mềm",
    category: "Chuyển đổi số & AI",
    status: "Đang ươm tạo - Vận hành Beta",
    target: "250.000.000 VNĐ",
    equity: "15% cổ phần",
    summary: "Nền tảng số kết nối trực tiếp nhà vườn hoa ly, hoa hồng và rau củ quả Đà Lạt tới người tiêu dùng toàn quốc, ứng dụng mã QR truy xuất nguồn gốc từng luống hoa của thanh niên.",
    highlights: [
      "Hơn 45 hộ thanh niên trồng hoa P. Xuân Hương đã số hóa gian hàng",
      "Hệ thống logistics vận chuyển lạnh giữ hoa tươi chuẩn 7 ngày",
      "Được Đoàn Phường bảo trợ truyền thông trên hệ thống số hóa thanh niên"
    ]
  },
  4: {
    title: "Bio-Pack: Bao Bì Sinh Học Từ Phụ Phẩm Atisô & Cà Phê",
    founder: "Võ Minh Đức (25 tuổi) - Kỹ sư sinh học",
    category: "Dịch vụ & Xã hội",
    status: "Đang gọi vốn hạt giống (Seed Round)",
    target: "650.000.000 VNĐ",
    equity: "15% cổ phần",
    summary: "Tận dụng hàng tấn bã cà phê và thân lá Atisô Đà Lạt thải bỏ mỗi ngày để sản xuất ly giấy, khay hộp tự hủy 100% trong đất sau 45 ngày, cung cấp cho các quán cà phê du lịch.",
    highlights: [
      "Đạt kiểm định tiêu chuẩn an toàn thực phẩm và khả năng phân hủy sinh học",
      "Đã ký thỏa thuận cung ứng với 22 chuỗi cafe & homestay tại Đà Lạt",
      "Giải Ba cuộc thi 'Startup Đổi Mới Sáng Tạo Xanh Tỉnh Lâm Đồng'"
    ]
  },
  5: {
    title: "Langbiang Arabica Specialty Coffee - Cà Phê Đặc Sản",
    founder: "Đặng Quang Huy (28 tuổi) - Chuyên gia thử nếm Q-Grader",
    category: "Nông nghiệp công nghệ cao",
    status: "Đã thương mại hóa",
    target: "400.000.000 VNĐ",
    equity: "10% cổ phần",
    summary: "Chế biến cà phê Arabica cao sản theo phương pháp lên men yếm khí tự nhiên, nâng tầm giá trị hạt cà phê Đà Lạt đạt chuẩn SCA 85+ điểm xuất khẩu sang Nhật và Châu Âu.",
    highlights: [
      "Hợp tác vùng trồng cùng 20 hộ đồng bào và thanh niên địa phương",
      "Doanh số tăng trưởng đều đặn 40%/quý",
      "Đạt chứng nhận OCOP 4 sao cấp Tỉnh"
    ]
  },
  6: {
    title: "Đà Lạt AI Tour Guide - Trợ Lý Du Lịch Thông Minh",
    founder: "Nguyễn Thị Thu Hà (23 tuổi) - Cử nhân CNTT",
    category: "Chuyển đổi số & AI",
    status: "Đang ươm tạo",
    target: "200.000.000 VNĐ",
    equity: "8% cổ phần",
    summary: "Trợ lý ảo tích hợp bản đồ số thông minh chỉ đường tới các vườn dâu, điểm check-in nông nghiệp và ẩm thực địa phương tại Phường Xuân Hương mà không bị chèo kéo cò mồi.",
    highlights: [
      "Hơn 5.000 người dùng kích hoạt thử nghiệm trong mùa Festival Hoa Đà Lạt",
      "Tích hợp tự động chỉ đường qua Google Maps và hỗ trợ đa ngôn ngữ"
    ]
  }
};

function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('projectSearchInput');
  const emptyState = document.getElementById('projectEmptyState');

  let currentCategory = 'all';
  let searchQuery = '';

  const updateDisplay = () => {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.project-card-title')?.innerText.toLowerCase() || '';
      const founder = card.querySelector('.project-founder-tag')?.innerText.toLowerCase() || '';
      const desc = card.querySelector('.project-card-desc')?.innerText.toLowerCase() || '';

      const matchesCat = currentCategory === 'all' || category === currentCategory;
      const matchesSearch = !searchQuery || title.includes(searchQuery) || founder.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        visibleCount++;
        card.style.display = 'flex';
        if (typeof gsap !== 'undefined') {
          gsap.killTweensOf(card);
          gsap.fromTo(card, 
            { opacity: 0, y: 15, scale: 0.97 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform' }
          );
        } else {
          card.style.opacity = '1';
          card.style.transform = '';
        }
      } else {
        if (typeof gsap !== 'undefined') {
          gsap.killTweensOf(card);
          gsap.to(card, {
            opacity: 0,
            y: 10,
            scale: 0.95,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              card.style.display = 'none';
            }
          });
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      updateDisplay();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      updateDisplay();
    });
  }
}

/* ==========================================================================
   4. MODALS (Project Detail Modal)
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = modalOverlay ? modalOverlay.querySelector('.modal-close-btn') : null;
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalFounder = document.getElementById('modalProjectFounder');
  const modalStatus = document.getElementById('modalProjectStatus');
  const modalTarget = document.getElementById('modalProjectTarget');
  const modalSummary = document.getElementById('modalProjectSummary');
  const modalHighlights = document.getElementById('modalProjectHighlights');

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-id');
      const data = projectsData[projId];

      if (data && modalOverlay) {
        modalTitle.innerText = data.title;
        modalCategory.innerText = data.category;
        modalFounder.innerText = data.founder;
        modalStatus.innerText = data.status;
        modalTarget.innerText = `${data.target} (${data.equity})`;
        modalSummary.innerText = data.summary;

        modalHighlights.innerHTML = '';
        data.highlights.forEach(item => {
          const li = document.createElement('li');
          li.style.marginBottom = '0.5rem';
          li.style.display = 'flex';
          li.style.alignItems = 'flex-start';
          li.style.gap = '0.5rem';
          li.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: #059669; font-size: 1.1rem; flex-shrink: 0; margin-top: 2px;"></i> <span>${item}</span>`;
          modalHighlights.appendChild(li);
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   5. FORM HANDLING & TABS
   ========================================================================== */
function initFormHandling() {
  const tabBtns = document.querySelectorAll('.form-tab-btn');
  const formMember = document.getElementById('formMember');
  const formStartup = document.getElementById('formStartup');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === 'member') {
        if (formMember) formMember.style.display = 'block';
        if (formStartup) formStartup.style.display = 'none';
      } else {
        if (formMember) formMember.style.display = 'none';
        if (formStartup) formStartup.style.display = 'block';
      }
    });
  });

  if (formMember) {
    formMember.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = formMember.querySelector('[name="fullname"]').value;
      showToast(`Chúc mừng ${name}! Đã gửi đăng ký tham gia CLB Thanh Niên Khởi Nghiệp Phường Xuân Hương - Đà Lạt thành công. Ban chủ nhiệm sẽ liên hệ qua Zalo!`);
      formMember.reset();
    });
  }

  if (formStartup) {
    formStartup.addEventListener('submit', (e) => {
      e.preventDefault();
      const projName = formStartup.querySelector('[name="project_name"]').value;
      showToast(`Hồ sơ dự án "${projName}" đã được tiếp nhận. Ban Thường Vụ Đoàn Phường Xuân Hương - Đà Lạt sẽ thẩm định và phản hồi sớm nhất!`);
      formStartup.reset();
    });
  }
}

/* ==========================================================================
   6. RESOURCE DOWNLOADS
   ========================================================================== */
function initResourceDownloads() {
  document.querySelectorAll('.download-resource-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || "Tài liệu khởi nghiệp";
      showToast(`Đang tải tài liệu: ${title}. Chúc bạn ứng dụng hiệu quả vào mô hình kinh doanh tại Phường Xuân Hương - Đà Lạt!`);
    });
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-box');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-box';
    toast.innerHTML = `
      <div class="toast-icon"><i class="ri-checkbox-circle-fill"></i></div>
      <div class="toast-text">
        <h5>Thông Báo Từ Ban Chủ Nhiệm</h5>
        <p class="toast-msg"></p>
      </div>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-msg').innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   8. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. GSAP & SCROLLTRIGGER ANIMATION ENGINE (ENTERPRISE STANDARD)
   ========================================================================== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Top Scroll Reading Progress Bar (Neon Gradient Tracker)
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar && typeof ScrollTrigger !== 'undefined') {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.15
      }
    });
  }

  // 2. Hero Section Cinematic Reveal Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl.fromTo('.hero-pill-badge', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, delay: 0.05, clearProps: 'all' })
        .fromTo('.hero-title', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, clearProps: 'all' }, '-=0.5')
        .fromTo('.hero-description', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, clearProps: 'all' }, '-=0.6')
        .fromTo('.hero-cta-group', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, clearProps: 'all' }, '-=0.5')
        .fromTo('.hero-social-proof', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, clearProps: 'all' }, '-=0.45')
        .fromTo('.hero-visual-card', { scale: 0.94, opacity: 0, y: 35 }, { scale: 1, opacity: 1, y: 0, duration: 0.95, clearProps: 'all' }, '-=0.75');

  // 3. Ambient Floating Background Shapes
  gsap.to('.shape-1', {
    y: 25,
    x: -15,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to('.shape-2', {
    y: -30,
    x: 20,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  if (typeof ScrollTrigger !== 'undefined') {
    // Parallax cho hình khối nền khi cuộn
    gsap.to('.shape-1', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });

    // 4. Section Headers Orchestrated Reveal (Tag -> Title -> Subtitle)
    document.querySelectorAll('.section-header').forEach(header => {
      const tag = header.querySelector('.section-tag');
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');
      const targets = [tag, title, subtitle].filter(Boolean);

      if (targets.length) {
        gsap.fromTo(targets, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: header,
              start: 'top 88%',
              once: true
            }
          }
        );
      }
    });

    // 5. Staggered Grid Reveal Engine (Storytelling Cascade)
    const animateGridGroup = (groupSelector, itemSelector, startPoint = 'top 86%', stagger = 0.12) => {
      const groups = document.querySelectorAll(groupSelector);
      groups.forEach(group => {
        const items = group.querySelectorAll(itemSelector);
        if (!items.length) return;

        // Kiểm tra xem đã hiển thị sẵn trong tầm nhìn chưa
        const groupRect = group.getBoundingClientRect();
        if (groupRect.top < window.innerHeight * 0.9) {
          gsap.set(items, { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
          return;
        }

        gsap.fromTo(items,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: stagger,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: group,
              start: startPoint,
              once: true
            }
          }
        );
      });
    };

    // Áp dụng Stagger cho các thành phần chính
    animateGridGroup('.stats-grid', '.stat-card', 'top 90%', 0.1);
    animateGridGroup('.about-pillars', '.pillar-card', 'top 86%', 0.12);
    animateGridGroup('.leadership-grid', '.leader-card', 'top 86%', 0.12);
    animateGridGroup('.projects-grid', '.project-card', 'top 85%', 0.1);
    animateGridGroup('.events-grid', '.event-card', 'top 85%', 0.12);
    animateGridGroup('.resources-grid', '.resource-card', 'top 85%', 0.1);

    // 6. Interactive Loan Calculator Reveal
    const loanCalc = document.querySelector('.loan-calculator-wrapper');
    if (loanCalc) {
      gsap.fromTo(loanCalc,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: loanCalc,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // 7. News Section Asymmetrical Reveal (Featured from Left, Mini from Right)
    const featuredNews = document.querySelector('.featured-news-card');
    const miniNewsList = document.querySelectorAll('.mini-news-card');
    if (featuredNews) {
      gsap.fromTo(featuredNews,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: featuredNews,
            start: 'top 86%',
            once: true
          }
        }
      );
    }
    if (miniNewsList.length) {
      gsap.fromTo(miniNewsList,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: miniNewsList[0],
            start: 'top 86%',
            once: true
          }
        }
      );
    }

    // 8. Contact Section Twin Slide
    const contactInfo = document.querySelector('.contact-info-col');
    const contactForm = document.querySelector('.contact-form-container');
    if (contactInfo && contactForm) {
      gsap.fromTo(contactInfo,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: contactInfo,
            start: 'top 85%',
            once: true
          }
        }
      );
      gsap.fromTo(contactForm,
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: contactForm,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // Refresh ScrollTrigger an toàn
    window.addEventListener('load', () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }
}



/* ==========================================================================
   11. HERO 3D MOUSE PARALLAX ENGINE
   ========================================================================== */
function initHeroParallax() {
  if (typeof gsap === 'undefined') return;

  const heroSection = document.querySelector('.hero-section');
  const heroCard = document.querySelector('.hero-preview-col');
  if (!heroSection || !heroCard) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width - 0.5;
    const yRel = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(heroCard, {
      rotateY: xRel * 14,
      rotateX: -yRel * 14,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power1.out'
    });
  });

  heroSection.addEventListener('mouseleave', () => {
    gsap.to(heroCard, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}

/* ==========================================================================
   12. REACTBITS SPOTLIGHT & 3D INTERACTIVE TILT ENGINE
   ========================================================================== */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');
  
  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 1. Quầng sáng Spotlight di chuyển theo con trỏ
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 2. Nghiêng 3D nhẹ nhàng theo góc chuột (Chuẩn Roku Hutt Studio)
      if (typeof gsap !== 'undefined') {
        const tiltX = ((y / rect.height) - 0.5) * -10;
        const tiltY = ((x / rect.width) - 0.5) * 10;
        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 950,
          duration: 0.25,
          ease: 'power1.out'
        });
      }
    });

    card.addEventListener('pointerleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  });
}

/* ==========================================================================
   11. INTERACTIVE NHCSXH LOAN ESTIMATOR CALCULATOR
   ========================================================================== */
function initLoanCalculator() {
  const amountRange = document.getElementById('loanAmountRange');
  const termRange = document.getElementById('loanTermRange');
  const amountDisplay = document.getElementById('loanAmountDisplay');
  const termDisplay = document.getElementById('loanTermDisplay');
  const principalDisplay = document.getElementById('monthlyPrincipal');
  const interestDisplay = document.getElementById('monthlyInterest');
  const totalDisplay = document.getElementById('monthlyTotal');
  const applyBtn = document.getElementById('btnApplyLoanCalc');

  if (!amountRange || !termRange) return;

  const formatVND = (num) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(num)) + ' đ';
  };

  const calculate = () => {
    const amountMil = parseFloat(amountRange.value); // in millions
    const termMonths = parseInt(termRange.value);    // months

    const amount = amountMil * 1000000;
    const monthlyPrincipal = amount / termMonths;
    // Policy interest rate NHCSXH Channel 120 is 6.6% per year = 0.55% per month
    const monthlyInterest = (amount * 0.066) / 12;
    const monthlyTotal = monthlyPrincipal + monthlyInterest;

    if (amountDisplay) amountDisplay.innerText = `${amountMil} Triệu VNĐ`;
    if (termDisplay) termDisplay.innerText = `${termMonths} Tháng (${termMonths / 12} năm)`;
    if (principalDisplay) principalDisplay.innerText = formatVND(monthlyPrincipal);
    if (interestDisplay) interestDisplay.innerText = formatVND(monthlyInterest);
    if (totalDisplay) totalDisplay.innerText = formatVND(monthlyTotal);
  };

  amountRange.addEventListener('input', calculate);
  termRange.addEventListener('input', calculate);
  calculate();

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const amountMil = amountRange.value;
      const termMonths = termRange.value;
      
      const startupTabBtn = document.querySelector('.form-tab-btn[data-tab="startup"]');
      if (startupTabBtn) startupTabBtn.click();

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      showToast(`Đã chọn gói vay ${amountMil} triệu (${termMonths} tháng). Vui lòng hoàn tất thông tin đề án!`);
    });
  }
}

/* ==========================================================================
   12. ONE-TOUCH OFFICIAL EMAIL COPY ENGINE
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('btnCopyEmail');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'doanphuongxuanhuongdalat@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="ri-check-line" style="color: #4ade80;"></i> <span>Đã chép!</span>';
      showToast(`Đã sao chép email: ${email} vào bộ nhớ tạm!`);
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
      }, 2500);
    }).catch(() => {
      showToast(`Hòm thư điện tử: ${email}`);
    });
  });
}

/* ==========================================================================
   13. REACTBITS: FLOATING QUICK-ACTION DOCK ENGINE
   ========================================================================== */
function initFloatingDock() {
  const dock = document.getElementById('floatingDock');
  const dockBackToTop = document.getElementById('dockBackToTop');
  const btnDockCopyEmail = document.getElementById('btnDockCopyEmail');

  if (!dock) return;

  // Tự động ẩn khi ở đỉnh trang, hiện khi cuộn qua Hero, và thu nhỏ khi ở khu vực form
  const contactSec = document.getElementById('contact');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 280) {
      dock.style.opacity = '1';
      dock.style.pointerEvents = 'auto';
      dock.style.transform = 'translateY(0)';

      // Kiểm tra nếu đang nhìn trực diện vào Form liên hệ thì tự động ẩn nhẹ
      if (contactSec) {
        const cRect = contactSec.getBoundingClientRect();
        if (cRect.top < window.innerHeight * 0.7 && cRect.bottom > 150) {
          dock.classList.add('dock-tucked');
        } else {
          dock.classList.remove('dock-tucked');
        }
      }
    } else {
      dock.style.opacity = '0';
      dock.style.pointerEvents = 'none';
      dock.style.transform = 'translateY(20px)';
    }
  }, { passive: true });

  // Tự động thu né dock khi người dùng đang nhập liệu trong form
  const formInputs = document.querySelectorAll('#contact input, #contact textarea, #contact select');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      dock.classList.add('dock-tucked');
    });
    input.addEventListener('blur', () => {
      setTimeout(() => {
        const stillFocused = document.activeElement && formInputs ? Array.from(formInputs).includes(document.activeElement) : false;
        if (!stillFocused) {
          dock.classList.remove('dock-tucked');
        }
      }, 200);
    });
  });

  // Nút Lên Đầu Trang trên Dock
  if (dockBackToTop) {
    dockBackToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Nút Sao Chép Email Đoàn Phường trên Dock
  if (btnDockCopyEmail) {
    btnDockCopyEmail.addEventListener('click', () => {
      const email = 'doanphuongxuanhuongdalat@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Đã chép hòm thư: ${email}`);
      }).catch(() => {
        showToast(`Email Đoàn Phường: ${email}`);
      });
    });
  }
}

