// 1. Curated Academic Datasets
const featuredResources = [
  {
    id: "feat-1",
    title: "Foundations of Neural Computation",
    category: "Computer Science & AI",
    icon: "bi-cpu",
    summary:
      "Rigorous mathematical treatment of optimization landscapes, transformer architectures, and statistical learning theory.",
  },
  {
    id: "feat-2",
    title: "Comparative Constitutional History",
    category: "Classical Humanities",
    icon: "bi-bank",
    summary:
      "Annotated primary manuscripts tracing civic governance from Athenian assemblies to modern democratic charters.",
  },
  {
    id: "feat-3",
    title: "Quantum Thermodynamics & Statistical Mechanics",
    category: "Applied Physics",
    icon: "bi-atom",
    summary:
      "Graduate lecture notes bridging classical ensemble theory with open quantum systems and nanoscale heat engines.",
  },
];

const academicCategories = [
  {
    id: "cat-1",
    title: "Computer Science",
    count: "3,420 Resources",
    icon: "bi-terminal",
  },
  {
    id: "cat-2",
    title: "Molecular Biology",
    count: "2,180 Resources",
    icon: "bi-virus",
  },
  {
    id: "cat-3",
    title: "Classical Humanities",
    count: "2,890 Resources",
    icon: "bi-columns-gap",
  },
  {
    id: "cat-4",
    title: "Applied Mathematics",
    count: "2,640 Resources",
    icon: "bi-infinity",
  },
  {
    id: "cat-5",
    title: "Macroeconomics",
    count: "1,950 Resources",
    icon: "bi-graph-up-arrow",
  },
  {
    id: "cat-6",
    title: "Earth & Climate",
    count: "1,920 Resources",
    icon: "bi-globe-americas",
    author: "Geoscience Open Collective",
  },
];

const sampleNodes = [
  {
    nodeName: "Cambridge Hub",
    badge: "CS-402 Syllabus",
    title: "Algorithms & Distributed Systems",
    icon: "bi-journal-code",
    desc: "Complete 14-week graduate lecture notes, consensus protocol proofs, and automated grading harnesses from the Cambridge Open Faculty Archive.",
    author: "Cambridge Systems Group",
    license: "Cambridge / MIT OER • CC BY 4.0",
    modules: [
      "Week 1–4: Raft & Paxos Consensus Proofs",
      "Week 5–9: Byzatine Fault Tolerance",
      "Week 10–14: Distributed Storage Engines",
    ],
    citation:
      "@misc{cambridge_cs402, title={Algorithms & Distributed Systems}, year={2026}, publisher={EduHub}}",
  },
  {
    nodeName: "Oxford Node",
    badge: "HIS-210 Manuscript",
    title: "Early Modern Scientific Revolution",
    icon: "bi-feather",
    desc: "High-resolution digitized correspondence from the Royal Society archives paired with seminar discussion prompts and historiography guides.",
    author: "Oxford History of Science Faculty",
    license: "Bodleian Open Access • CC BY-SA 4.0",
    modules: [
      "Unit 1: Copernican & Galilean Treatises",
      "Unit 2: Experimental Philosophy in 17th-Century London",
      "Unit 3: Annotated Primary Letter Transcriptions",
    ],
    citation:
      "@misc{oxford_his210, title={Early Modern Scientific Revolution}, year={2026}, publisher={EduHub}}",
  },
  {
    nodeName: "Zurich Hub",
    badge: "ENV-315 Lab Kit",
    title: "Alpine Glaciology & Climate Telemetry",
    icon: "bi-snow2",
    desc: "Open telemetry datasets, mass-balance differential equations, and R/Python visualization scripts from Swiss alpine monitoring stations.",
    author: "ETH Environmental Systems Lab",
    license: "ETH Open Data • CC BY 4.0",
    modules: [
      "Lab 1: NetCDF Climate Dataset Parsing",
      "Lab 2: Glacier Mass-Balance Modeling",
      "Lab 3: Satellite Albedo Time-Series Analysis",
    ],
    citation:
      "@misc{zurich_env315, title={Alpine Glaciology & Climate Telemetry}, year={2026}, publisher={EduHub}}",
  },
];

let activeModalResource = featuredResources[0];
let currentSampleIndex = 0;

// Render Featured Cards (Right Column of Featured Section)
function renderFeaturedCards() {
  const container = document.getElementById("featured-cards-container");
  container.innerHTML = featuredResources
    .map(
      (item) => `
            <div class="col-12 col-md-4">
              <article class="academic-card shadow-sm">
                <div class="card-visual-header">
                  <div class="card-visual-icon">
                    <i class="bi ${item.icon}"></i>
                  </div>
                </div>
                <div class="p-3 d-flex flex-column flex-grow-1">
                  <span class="badge-crimson-soft align-self-start mb-2">${item.category}</span>
                  <h3 class="header-font h5 fw-bold mb-2">${item.title}</h3>
                  <p class="text-color small flex-grow-1 mb-3">${item.summary}</p>
                  <button
                    type="button"
                    class="btn-primary-bg py-2 px-3 rounded small fw-semibold w-100"
                    onclick="openResourceModal('featured', '${item.id}')"
                  >
                    Read More
                  </button>
                </div>
              </article>
            </div>
          `,
    )
    .join("");
}

// Render 6-Card Categories Grid
function renderCategoryCards() {
  const grid = document.getElementById("categories-grid");
  grid.innerHTML = academicCategories
    .map(
      (cat) => `
            <div class="col-12 col-sm-6 col-md-4 col-lg-2">
              <article class="academic-card shadow-sm text-center">
                <div class="card-visual-header category-card-visual">
                  <div class="card-visual-icon" style="width: 46px; height: 46px; font-size: 1.35rem;">
                    <i class="bi ${cat.icon}"></i>
                  </div>
                </div>
                <div class="p-3 d-flex flex-column flex-grow-1">
                  <h3 class="header-font h6 fw-bold mb-1">${cat.title}</h3>
                  <p class="text-color small mb-3 flex-grow-1">${cat.count}</p>
                  <button
                    type="button"
                    class="btn-primary-bg py-1 px-2 rounded small fw-semibold w-100"
                    onclick="openResourceModal('category', '${cat.id}')"
                  >
                    View Resource
                  </button>
                </div>
              </article>
            </div>
          `,
    )
    .join("");
}

// Interactive Sample Resource Map Node Switcher
function selectSampleNode(index) {
  currentSampleIndex = index;
  const node = sampleNodes[index];
  document.getElementById("active-node-label").textContent = node.nodeName;
  document.getElementById("sample-badge").textContent = node.badge;
  document.getElementById("sample-title").textContent = node.title;
  document.getElementById("sample-desc").textContent = node.desc;
  document.getElementById("sample-icon-box").innerHTML =
    `<i class="bi ${node.icon}"></i>`;
}

function openCurrentSampleModal() {
  const node = sampleNodes[currentSampleIndex];
  populateAndShowModal({
    category: node.nodeName + " • " + node.badge,
    title: node.title,
    author: node.author,
    license: node.license,
    summary: node.desc,
    modules: node.modules,
    citation: node.citation,
  });
}

// Scroll-Spy for Active Navigation Link Highlighting
function setupScrollSpy() {
  const sections = [
    { id: "home", navHref: "#home" },
    { id: "Introduction", navHref: "#Introduction" },
    { id: "featured", navHref: "#featured" },
    { id: "categories-section", navHref: "#categories-section" },
    { id: "resources", navHref: "#resources" },
    { id: "about", navHref: "#about" },
  ];

  const navLinks = document.querySelectorAll("#navbar .nav-link");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 140;
    let currentHref = "#home";

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el && el.offsetTop <= scrollPos) {
        currentHref = sec.navHref;
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === currentHref,
      );
    });
  });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedCards();
  renderCategoryCards();
  setupScrollSpy();
});
