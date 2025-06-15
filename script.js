// In-memory job list (simulate a database)
let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    description: "Work with React to build beautiful UIs.",
    type: "Full Time",
    posted: "2025-06-10"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "DataWorks",
    location: "New York, NY",
    description: "Build scalable APIs using Node.js.",
    type: "Part Time",
    posted: "2025-06-09"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Designify",
    location: "San Francisco, CA",
    description: "Design intuitive interfaces and experiences.",
    type: "Contract",
    posted: "2025-06-08"
  }
];

let currentJobId = jobs.length;

function showPage(pageId) {
  // Hide all pages
  document.getElementById("page-listings").classList.add("hidden");
  document.getElementById("page-details").classList.add("hidden");
  document.getElementById("page-post").classList.add("hidden");
  document.getElementById("page-about").classList.add("hidden");
  // Show selected page
  document.getElementById(pageId).classList.remove("hidden");
}

function renderJobListings() {
  const page = document.getElementById("page-listings");
  page.innerHTML = `<h1 class="text-3xl font-bold text-blue-700 mb-6">Job Listings</h1>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    ${jobs.map(job => `
      <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer" data-jobid="${job.id}">
        <h2 class="text-xl font-semibold text-blue-600 mb-2">${job.title}</h2>
        <div class="text-gray-700 font-medium mb-1">${job.company}</div>
        <div class="text-gray-500 mb-1">${job.location}</div>
        <div class="text-sm text-gray-400 mb-2">Type: ${job.type}</div>
        <p class="text-gray-600 mb-4">${job.description.substring(0, 60)}...</p>
        <div class="text-xs text-gray-400">Posted: ${job.posted}</div>
      </div>
    `).join("")}
    </div>
  `;
  // Add event listeners to job cards
  page.querySelectorAll("[data-jobid]").forEach(card =>
    card.addEventListener("click", () => showJobDetails(parseInt(card.dataset.jobid)))
  );
}

function showJobDetails(jobId) {
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;
  const page = document.getElementById("page-details");
  page.innerHTML = `
    <button class="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded" id="back-listings">&larr; Back to Listings</button>
    <div class="bg-white rounded-lg shadow p-8">
      <h2 class="text-2xl font-bold text-blue-700 mb-2">${job.title}</h2>
      <div class="text-lg font-medium text-gray-800 mb-1">${job.company}</div>
      <div class="text-gray-600 mb-2">${job.location}</div>
      <div class="text-sm text-gray-500 mb-2">Type: ${job.type}</div>
      <div class="text-sm text-gray-400 mb-4">Posted: ${job.posted}</div>
      <p class="text-gray-700 mb-4">${job.description}</p>
      <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Apply Now</button>
    </div>
  `;
  document.getElementById("back-listings").addEventListener("click", () => {
    showPage("page-listings");
    renderJobListings();
  });
  showPage("page-details");
}

function renderPostJobForm() {
  const page = document.getElementById("page-post");
  page.innerHTML = `
    <h1 class="text-2xl font-bold text-blue-700 mb-6">Post a Job</h1>
    <form id="job-form" class="bg-white shadow rounded-lg p-8 max-w-xl mx-auto">
      <div class="mb-4">
        <label class="block mb-1 font-medium text-gray-700" for="title">Job Title</label>
        <input class="w-full border rounded px-3 py-2" type="text" id="title" required>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium text-gray-700" for="company">Company</label>
        <input class="w-full border rounded px-3 py-2" type="text" id="company" required>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium text-gray-700" for="location">Location</label>
        <input class="w-full border rounded px-3 py-2" type="text" id="location" required>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium text-gray-700" for="type">Job Type</label>
        <select class="w-full border rounded px-3 py-2" id="type" required>
          <option value="">Select...</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block mb-1 font-medium text-gray-700" for="description">Description</label>
        <textarea class="w-full border rounded px-3 py-2" id="description" rows="3" required></textarea>
      </div>
      <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Post Job</button>
      <div id="form-message" class="mt-3 text-green-600"></div>
    </form>
  `;
  document.getElementById("job-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const company = document.getElementById("company").value.trim();
    const location = document.getElementById("location").value.trim();
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value.trim();

    if (!title || !company || !location || !type || !description) {
      document.getElementById("form-message").textContent = "Please fill all fields.";
      return;
    }

    currentJobId++;
    jobs.unshift({
      id: currentJobId,
      title,
      company,
      location,
      description,
      type,
      posted: new Date().toISOString().split("T")[0]
    });

    // Reset form and message
    this.reset();
    document.getElementById("form-message").textContent = "Job posted successfully!";
    // Go back to listings after short delay
    setTimeout(() => {
      showPage("page-listings");
      renderJobListings();
    }, 1200);
  });
}

function renderAboutPage() {
  document.getElementById("page-about").innerHTML = `
    <h1 class="text-2xl font-bold text-blue-700 mb-4">About JobBoard</h1>
    <div class="bg-white rounded-lg shadow p-8">
      <p class="text-gray-700 mb-2">
        <b>JobBoard</b> is a demo job listing platform built with HTML, JavaScript, and Tailwind CSS.
      </p>
      <p class="text-gray-700">
        Browse jobs, view detailed job postings, or post your own job openings. All data is stored in-memory and resets on refresh.
      </p>
    </div>
  `;
}

// Navigation event listeners
document.getElementById("nav-home").addEventListener("click", () => {
  showPage("page-listings");
  renderJobListings();
});
document.getElementById("nav-listings").addEventListener("click", () => {
  showPage("page-listings");
  renderJobListings();
});
document.getElementById("nav-post").addEventListener("click", () => {
  showPage("page-post");
  renderPostJobForm();
});
document.getElementById("nav-about").addEventListener("click", () => {
  showPage("page-about");
  renderAboutPage();
});

// SPA-style initial load
showPage("page-listings");
renderJobListings();