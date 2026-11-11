// Shared JavaScript interactions for Glow & Grace
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
  }

  // Product filter
  const filter = document.querySelector("#category-filter");
  if (filter) {
    filter.addEventListener("change", () => {
      document.querySelectorAll(".shop-grid .product-card").forEach(card => {
        card.hidden = filter.value !== "all" && card.dataset.category !== filter.value;
      });
    });
  }

  // Product button interaction. GA4 custom event can be checked after your real ID is installed.
  document.querySelectorAll(".product-action").forEach(button => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product;
      if (typeof gtag === "function") {
        gtag("event", "select_item", {
          item_list_name: "Glow & Grace product collection",
          items: [{ item_name: productName }]
        });
      }
      alert(productName + " selected! This is a sample website interaction.");
    });
  });

  // Demonstration contact form: it does not send or store any information.
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      document.querySelector("#contact-message").textContent =
        "Thank you! Your demo enquiry was completed. No message has been sent or stored.";
      if (typeof gtag === "function") {
        gtag("event", "demo_form_submit", { form_name: "contact_enquiry" });
      }
      contactForm.reset();
    });
  }

  // Demonstration newsletter form: no subscription is created.
  const newsletterForm = document.querySelector("#newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();
      document.querySelector("#newsletter-message").textContent =
        "Thanks for trying the demo sign-up! No subscription has been created.";
      if (typeof gtag === "function") {
        gtag("event", "demo_newsletter_submit");
      }
      newsletterForm.reset();
    });
  }
});
